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
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Daily Itinerary</h2>
      <div className="space-y-8">
        {sortedDays.map((dayKey, index) => {
          const dayData = itinerary[dayKey];
          return (
            <div key={index} className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-orange-500 to-[#f56551] p-4 text-white">
                <h3 className="text-xl font-semibold">Day {index + 1}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 gap-4">
                {dayData.places.map((place, i) => (
                  <PlaceCardItems key={i} place={place} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;