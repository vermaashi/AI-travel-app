import { GetPlaceDetails } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaRegShareSquare, FaCalendarAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from 'sonner';

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!trip) return;
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      try {
        const resp = await GetPlaceDetails(data);
        const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;
        if (photoName) {
          setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photoName));
        } else {
          setPhotoUrl('/Placeholder.svg');
        }
      } catch (error) {
        console.error(error);
        setPhotoUrl('/Placeholder.svg');
      }
    };
    fetchPhoto();
  }, [trip]);

  const shareTrip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Trip to ${trip?.userSelection?.location?.label}`,
          text: `Check out my ${trip?.userSelection?.noOfDays}-day trip to ${trip?.userSelection?.location?.label} planned with AI!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Trip link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-700">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={photoUrl}
          className={`object-cover w-full h-full transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          alt={trip?.userSelection?.location?.label || 'Trip destination'}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-black/50 animate-pulse"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl md:text-3xl text-orange-100 font-bold flex items-center">
            <IoLocationOutline className="mr-2" />
            {trip?.userSelection?.location?.label}
          </h1>
        </div>
        <button 
          onClick={shareTrip}
          className="absolute top-4 right-4 bg-gray-800/80 text-orange-400 p-2 rounded-full hover:bg-gray-700/90 transition-colors border border-gray-600"
        >
          <FaRegShareSquare className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="bg-orange-500/20 p-2 rounded-full mr-3">
              <FaCalendarAlt className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-orange-300">Duration</p>
              <p className="font-semibold text-white">{trip?.userSelection?.noOfDays} Days</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="bg-orange-500/20 p-2 rounded-full mr-3">
              <FaMoneyBillWave className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-orange-300">Budget</p>
              <p className="font-semibold text-white">{trip?.userSelection?.budget}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="bg-orange-500/20 p-2 rounded-full mr-3">
              <FaUsers className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-orange-300">Travelers</p>
              <p className="font-semibold text-white">{trip?.userSelection?.traveler}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;