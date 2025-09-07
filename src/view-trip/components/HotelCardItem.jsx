import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from './InfoSection';
import { FaMapMarkerAlt, FaStar, FaDollarSign } from 'react-icons/fa';

function HotelCardItem({ hotels }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className="group block"
    >
      <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-700">
        <div className="relative h-48 overflow-hidden">
          <img
            src={photoUrl}
            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            alt={hotels.hotelName}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-black/50 animate-pulse"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-white truncate">{hotels.hotelName}</h2>
          <div className="flex items-center mt-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="h-3 w-3 mr-1" />
            <span className="truncate">{hotels.hotelAddress}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center text-sm text-gray-300">
              <FaDollarSign className="h-3 w-3 mr-1" />
              <span>{hotels.price}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <FaStar className="h-3 w-3 mr-1 text-yellow-400" />
              <span>{hotels.rating}</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg font-medium text-sm transition-colors group-hover:bg-orange-500/20 group-hover:text-orange-300">
            View on Map
          </button>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;