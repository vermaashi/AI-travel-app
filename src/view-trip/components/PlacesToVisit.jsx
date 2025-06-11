import React from 'react';
import PlaceCardItems from './PlaceCardItems';

function PlacesToVisit({ trip }) {
  const itinerary = trip.tripData?.itinerary || {};

  // Sort the days in order: day1, day2, ...
  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace('day', ''));
    const dayB = parseInt(b.replace('day', ''));
    return dayA - dayB;
  });

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl mb-4'>Places To Visit</h2>
      <div className='grid grid-cols-2 gap-5'>
        {sortedDays.map((dayKey, index) => {
          const dayData = itinerary[dayKey];
          return (
            <div key={index} className='mb-6 '>
              <h3 className='text-lg font-semibold mb-2'>Day {index + 1}</h3>
              <ul className='list-disc ml-5'>
                {dayData.places.map((place, i) => (
                  <li key={i} className='mb-1'>
                    <span className='font-medium'></span>{place.timeTravel}
                    <div className='my-3  '>
                      <PlaceCardItems place={place} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
