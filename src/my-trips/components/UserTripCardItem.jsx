import React, { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from '@/view-trip/components/InfoSection';
import { Link } from 'react-router-dom';
import { AiOutlineCalendar, AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!trip?.userSelection?.location?.label) return;
      const data = {
        textQuery: trip.userSelection.location.label,
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

  return (
    <Link to={'/view-trip/' + trip.id}>
      <div className="group bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-700">
        <div className="relative h-48 overflow-hidden">
          <img
            src={photoUrl}
            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            alt={trip?.userSelection?.location?.label || 'Trip'}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-black/50 animate-pulse"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white truncate flex items-center gap-1">
            <IoLocationOutline className="h-4 w-4 text-orange-500" />
            {trip?.userSelection?.location?.label || 'Unknown Destination'}
          </h3>
          
          <div className="flex justify-between items-center mt-3 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <AiOutlineCalendar className="h-4 w-4" />
              <span>{trip?.userSelection?.noOfDays} days</span>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineDollar className="h-4 w-4" />
              <span>{trip?.userSelection?.budget}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-700">
            <button className="w-full py-2 text-sm bg-orange-500/10 text-orange-400 rounded-lg font-medium transition-colors group-hover:bg-orange-500/20 group-hover:text-orange-300">
              View Itinerary
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;