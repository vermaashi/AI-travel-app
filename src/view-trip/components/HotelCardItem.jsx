import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from './InfoSection';

function HotelCardItem({ hotels }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!hotels) return;
      const data = {
        textQuery: hotels.hotelName,
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
  }, [hotels]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotels.hotelName + ',' + hotels.hotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className='hover:scale-110 transition-all'>
        <img src={photoUrl} className='rounded-xl h-[180px] w-full object-cover' alt={hotels.hotelName} />
        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotels.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍{hotels.hotelAddress}</h2>
          <h2 className='text-sm'>💰{hotels.price}</h2>
          <h2 className='text-sm'>⭐{hotels.rating}</h2>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
