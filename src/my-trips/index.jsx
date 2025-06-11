import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

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
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-15'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 mt-10'>
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
          ))
        ) : userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCardItem key={trip.id || index} trip={trip} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No trips found.</div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
