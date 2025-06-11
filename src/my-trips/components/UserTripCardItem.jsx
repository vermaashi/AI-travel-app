import React, { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/Service/GlobalApi';
import { PHOTO_REF_URL } from '@/view-trip/components/InfoSection';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/Placeholder.svg');

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
      <div>
        <img
          src={photoUrl}
          className="object-cover rounded-xl w-[250px] h-[250px]"
          alt={trip?.userSelection?.location?.label || 'Trip'}
        />
        <div>
          <h2>{trip?.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500 '>
            {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
