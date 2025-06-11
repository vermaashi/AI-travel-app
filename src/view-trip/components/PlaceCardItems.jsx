import React, { useEffect, useState } from 'react';
import { FaMapMarked } from "react-icons/fa";
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from './InfoSection';

function PlaceCardItems({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!place) return;
      const data = {
        textQuery: place.placeName,
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
  }, [place]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName + ',' + (place.placeAddress || ''))}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl} className='w-[130px] h-[130px] rounded-xl' alt={place.placeName} />
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2>🕒{place.timeTravel}</h2>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItems;
