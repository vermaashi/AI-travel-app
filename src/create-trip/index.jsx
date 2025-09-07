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
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import { useNavigate } from 'react-router';
import { 
  AiOutlineLoading3Quarters, 
  AiOutlineCalendar, 
  AiOutlineTeam, 
  AiOutlineDollar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/a.svg';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { title: "Destination", icon: <IoLocationOutline />, key: 'location' },
    { title: "Duration", icon: <AiOutlineCalendar />, key: 'noOfDays' },
    { title: "Budget", icon: <AiOutlineDollar />, key: 'budget' },
    { title: "Travelers", icon: <AiOutlineTeam />, key: 'traveler' }
  ];

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
    
    // Validate all required fields
    const missingFields = steps.filter(step => !formData[step.key]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.map(f => f.title).join(', ')}`);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('[PLACE]', formData.location)
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      SaveAiTrip(result?.response?.text())
    } catch (error) {
      setLoading(false)
      console.error("AI trip generation failed:", error);
      toast.error("Failed to generate trip. Please try again.");
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
    } finally {
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
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      await OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching Google profile:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (!formData[steps[activeStep].key]) {
      toast.error(`Please select a ${steps[activeStep].title.toLowerCase()}`);
      return;
    }
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Animation variants for step transitions
  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}

        <div className="bg-gradient-to-r from-emerald-600 to-cyan-700 text-white p-8 relative overflow-hidden">
  
          <div className="absolute inset-0 bg-white opacity-5"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Plan Your Perfect Trip</h1>
            <p className="text-emerald-100 text-lg">
              Share your travel preferences, and our AI will craft a personalized itinerary just for you
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-8 pt-8">
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 transform -translate-y-1/2 -z-10"></div>
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index <= activeStep
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                      : index === activeStep
                      ? 'border-emerald-600 bg-white text-emerald-600'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`mt-3 text-sm font-medium ${
                    index <= activeStep ? 'text-emerald-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
                {index <= activeStep && (
                  <div className="absolute -bottom-8 w-32 text-center">
                    <span className="text-xs text-emerald-600 font-medium">
                      {formData[step.key] ? '✓ Completed' : ''}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <section
          className="relative bg-cover bg-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/depv6uo3x/image/upload/v1757258857/download_hjtgz5.jpg')",
            }}
          ></div>
          <div className="px-8 pb-10 pt-6 relative z-10">
            <AnimatePresence custom={activeStep} mode="wait">
              <motion.div
                key={activeStep}
                custom={activeStep}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-6"
              >
                {/* Destination Step */}
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white">Where would you like to go?</h2>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">Destination</label>
                      <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                          value: place,
                          onChange: (v) => {
                            setPlace(v);
                            handleInputChange('location', v);
                          },
                          placeholder: "Search for a destination...",
                          className: "w-full",
                          styles: {
                            control: (provided) => ({
                              ...provided,
                              padding: '0.75rem',
                              borderRadius: '0.75rem',
                              border: '2px solid #e5e7eb',
                              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                              '&:hover': {
                                borderColor: '#10b981'
                              },
                              '&:focus-within': {
                                borderColor: '#10b981',
                                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
                              }
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#ecfdf5' : 'white',
                              color: state.isSelected ? 'white' : '#1f2937',
                              '&:active': {
                                backgroundColor: '#10b981',
                                color: 'white'
                              }
                            })
                          }
                        }}
                      />
                    </div>
                    {formData.location && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"
                      >
                        <p className="text-emerald-700 font-medium">Selected: {formData.location.label}</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Duration Step */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white">How many days will your trip be?</h2>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">Trip Duration (days)</label>
                      <input
                        placeholder="e.g., 5"
                        type="number"
                        min="1"
                        max="30"
                        value={formData.noOfDays || ''}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-lg text-white placeholder-white bg-transparent"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                      />
                    </div>
                    {formData.noOfDays && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"
                      >
                        <p className="text-emerald-700 font-medium">{formData.noOfDays} day{formData.noOfDays > 1 ? 's' : ''} selected</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Budget Step */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white">What's your budget?</h2>
                    <p className="text-gray-400">The budget is exclusively allocated for activities and dining purposes.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {SelectBudgetOptions.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInputChange('budget', item.title)}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData?.budget === item.title
                              ? 'border-emerald-500 bg-emerald-900/30 shadow-md' // ✅ highlighted state (emerald tint)
                              : 'border-gray-700 bg-gray-800 hover:border-emerald-600 hover:shadow-md' // ✅ dark mode base
                          }`}
                        >
                          <div className="text-3xl mb-3 text-emerald-400">{item.icon}</div>
                          <h3 className="font-semibold text-gray-100">{item.title}</h3>
                          <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                        </motion.div>

                      ))}
                    </div>
                  </div>
                )}

                {/* Travelers Step */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white">Who are you traveling with?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {selectTravelesList.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInputChange('traveler', item.people)}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData?.traveler === item.people
                              ? 'border-emerald-500 bg-emerald-900/30 shadow-md' 
                              : 'border-gray-700 bg-gray-800 hover:border-emerald-600 hover:shadow-md'
                          }`} 
                        >
                          <div className="text-3xl mb-3 text-emerald-400">{item.icon}</div>
                          <h3 className="font-semibold text-gray-100">{item.title}</h3>
                          <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                        </motion.div>
                      ))}

                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                  activeStep === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <AiOutlineArrowLeft className="h-5 w-5" />
                Back
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition flex items-center gap-2"
                >
                  Next
                  <AiOutlineArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  onClick={OnGenerateTrip}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-cyan-700 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                      Generating Your Trip...
                    </>
                  ) : (
                    'Generate My Trip'
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Sign In Required</DialogTitle>
            <DialogDescription className="text-center mt-4">
              <div className="flex justify-center mb-6">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-gray-600 mb-6">
                Sign in with Google to save and generate your personalized trip itinerary
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={login}
                className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
              >
                <FcGoogle className="h-6 w-6" />
                <span className="font-medium text-gray-700">Sign In with Google</span>
              </motion.button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;