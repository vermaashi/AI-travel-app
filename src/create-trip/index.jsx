import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import axios from 'axios';
import { AI_PROMPT, SelectBudgetOptions, selectTravelesList } from '../constants/options';
import { toast } from 'sonner';
import { chatSession } from '@/Service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading]= useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.error(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.noOfDays || !formData?.traveler || !formData?.location || !formData?.budget) {
      toast("Please fill all details.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      
      .replace('[PLACE]', formData.location)
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);
    // const result= await chatSession.sendMessage(FINAL_PROMPT);
    // console.log('--',result?.response?.text());
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("--",result?.response?.text());
      SaveAiTrip(result?.response?.text())
    } catch (error) {
      setLoading(false)
      console.error("AI trip generation failed:", error);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const DocId = Date.now().toString();
      await setDoc(doc(db, "AITrips", DocId), {
        userSelection: formData,
        tripData: JSON.parse(TripData), 
        userEmail: user?.email,
        id: DocId
      });
      toast.success("AI Trip saved successfully!");
      navigate('/view-trip/'+DocId)
 
    } catch (error) {
      console.error("Error saving AI trip:", error);
      toast.error("Failed to save trip. Please check Firestore rules.");
    }
  finally{
    setLoading(false);
  }
    
  };

  
  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      await OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  };

  return (
    <div className='pl-20 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-15'>
      <h2 className='pl-20 font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='pl-20 mt-5 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preference.
      </p>

      <div className='pl-20 mt-20 flex flex-col gap-10'>
        <h2 className='text-xl font-medium'>What is the Destination of Choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange('location', v);
            },
          }}
        />

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <input
            placeholder="ex. 3"
            type='number'
            className="border p-2 rounded-lg w-full"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <h3>The budget is exclusively allocated for activities and dining purposes.</h3>
          <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-2xl ${
                  formData?.budget === item.title && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>
            {selectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-2xl ${
                  formData?.traveler === item.people && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='my-1 justify-end flex'>
          <button 
           disabled={loading} 
          onClick={OnGenerateTrip} className="px-5 py-2 bg-blue-500 text-white rounded-lg">
         
          {loading?
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'

          }
          </button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription className="text-center">
                <img src='freepik-doodle-linear-trippod-online-price-comparison-logo-20250610182827AL7i.png' alt="Logo" className='h-[50px] w-[250px] object-cover'/>
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>Sign in to the app with Google Authentication</p>
                <button 
                  onClick={login}
                  className='w-full mt-5 flex gap-4 items-center p-2 border rounded-lg'
                >
                  <FcGoogle className='h-7 w-7'/>Sign In with Google
                </button>
              </DialogDescription>  
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
