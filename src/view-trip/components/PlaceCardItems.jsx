import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from './InfoSection';

function PlaceCardItems({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className="block group"
    >
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-4 flex gap-4 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-700">
        <div className="relative flex-shrink-0">
          <img
            src={photoUrl}
            className={`w-24 h-24 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            alt={place.placeName}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-black/50 animate-pulse rounded-lg w-24 h-24"></div>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="font-semibold text-white">{place.placeName}</h2>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{place.placeDetails}</p>
          <div className="flex items-center mt-2 text-sm text-gray-300">
            <FaClock className="h-3 w-3 mr-1" />
            <span>{place.timeTravel}</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-orange-400">
            <FaMapMarkedAlt className="h-3 w-3 mr-1" />
            <span className="font-medium">View on Map</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItems;