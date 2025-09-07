import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((hotels, index) => (
          <HotelCardItem hotels={hotels} key={hotels.id || index}/>
        ))}
      </div>
    </div>
  )
}

export default Hotels;