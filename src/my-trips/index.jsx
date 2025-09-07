import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTrips(trips);
    setLoading(false);
  };

  useEffect(() => {
    GetUserTrips();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Trips</h1>
            <p className="text-orange-300 mt-2">
              {userTrips.length} {userTrips.length === 1 ? 'trip' : 'trips'} planned
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-trip')}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-[#f56551] text-white font-medium rounded-full shadow-lg transition-all duration-300 hover:shadow-xl shadow-orange-500/30"
          >
            <AiOutlinePlus className="h-5 w-5" />
            Plan New Trip
          </motion.button>
        </div>

        {/* Trips Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-72 bg-gradient-to-br from-gray-800 to-black/50 animate-pulse rounded-2xl shadow-md border border-gray-700"></div>
            ))}
          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userTrips.map((trip, index) => (
              <UserTripCardItem key={trip.id || index} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-700">
            <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No trips yet</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Start planning your next adventure! Create your first trip itinerary with our AI-powered trip planner.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create-trip')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-[#f56551] text-white font-medium rounded-full shadow-lg transition-all duration-300 hover:shadow-xl shadow-orange-500/30"
            >
              Plan Your First Trip
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;