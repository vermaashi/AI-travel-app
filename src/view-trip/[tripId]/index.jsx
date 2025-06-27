import { db } from '@/Service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip () {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({}); // FIX: initialize as object

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
        // eslint-disable-next-line
    }, [tripId]);

    // use to get trip information from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docsnap = await getDoc(docRef);

        if (docsnap.exists()) {
            console.log("Document: ", docsnap.data());
            setTrip(docsnap.data());
        } else {
            console.log("NO such Document found.");
            toast('no trip found!'); // FIX: typo
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* {Information section} */}
            <InfoSection trip={trip} />
            {/* {Hotel recommendation} */}
            <Hotels trip={trip} />
            {/* {Daily plan} */}
            <PlacesToVisit trip={trip} />
            {/* {footer} */}
            <Footer />
        </div>
    )
}
export default Viewtrip