import { GetPlaceDetails } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaRegShareSquare } from "react-icons/fa";

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');

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

  return (
    <div>
      <img src={photoUrl} className='h-[340px] w-full rounded-2xl' alt="Location" />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>
            {trip?.userSelection?.location?.label}
          </h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>
              🗓️ {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>
              💰 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md'>
              🥂 Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <button> <FaRegShareSquare /></button>
      </div>
    </div>
  );
}

export default InfoSection;
