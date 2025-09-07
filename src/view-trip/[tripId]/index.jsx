import { db } from '@/Service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docsnap = await getDoc(docRef);

        if (docsnap.exists()) {
            console.log("Document: ", docsnap.data());
            setTrip(docsnap.data());
        } else {
            console.log("No such Document found.");
            toast.error('No trip found!');
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
                {/* Background pattern */}
                {/* <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/depv6uo3x/image/upload/v1757258857/download_hjtgz5.jpg')] opacity-10"></div> */}
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="h-80 bg-gradient-to-br from-gray-800 to-black/50 animate-pulse rounded-2xl mb-6 border border-gray-700"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-96 bg-gradient-to-br from-gray-800 to-black/50 animate-pulse rounded-2xl border border-gray-700"></div>
                        <div className="h-96 bg-gradient-to-br from-gray-800 to-black/50 animate-pulse rounded-2xl border border-gray-700"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Information section */}
                <InfoSection trip={trip} />
                {/* Hotel recommendation */}
                <Hotels trip={trip} />
                {/* Daily plan */}
                <PlacesToVisit trip={trip} />
                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}
export default Viewtrip;