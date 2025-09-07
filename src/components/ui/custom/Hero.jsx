import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { FaCompass, FaRoute, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/depv6uo3x/image/upload/v1757258857/download_hjtgz5.jpg')] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center gap-12">
        {/* Main headline */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-[#f56551]">
              Discover your next adventure with AI
            </span>
            <span className="block text-white mt-4">
              Personalized Itineraries at your fingertips
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/create-trip'>
              <Button className="bg-gradient-to-r from-orange-500 to-[#f56551] hover:from-orange-600 hover:to-[#e05541] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-orange-500/30">
                Get Started, It's Free
              </Button>
            </Link>
            <Link to='/my-trips'>
              <Button variant="outline" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                View My Trips
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300">
            <div className="bg-gradient-to-br from-orange-500 to-[#f56551] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <FaCompass className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-gray-300">Intelligent algorithms craft perfect itineraries based on your preferences</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300">
            <div className="bg-gradient-to-br from-orange-500 to-[#f56551] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <FaRoute className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Custom Routes</h3>
            <p className="text-gray-300">Tailored daily plans that match your pace and interests perfectly</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300">
            <div className="bg-gradient-to-br from-orange-500 to-[#f56551] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <FaMapMarkedAlt className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Local Insights</h3>
            <p className="text-gray-300">Discover hidden gems and local favorites beyond tourist traps</p>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gradient-to-r from-orange-500/10 to-[#f56551]/10 p-8 rounded-2xl border border-orange-500/20 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
              <div className="text-orange-400">Trips Planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-orange-400">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
              <div className="text-orange-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
              <div className="text-orange-400">Support</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl italic text-gray-300">
              "This AI trip planner saved me hours of research and gave me the perfect itinerary for my Japan trip. 
              The recommendations were spot on!"
            </p>
            <div className="mt-4">
              <div className="text-white font-medium">Sarah Johnson</div>
              <div className="text-orange-400">Travel Enthusiast</div>
            </div>
          </div>
        </div>

        {/* Hero image
        <div className="mt-12 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-[#f56551] rounded-2xl opacity-20 blur-lg"></div>
          <img 
            src="/person-working-laptop-outdoors.jpg" 
            alt="Person planning trip outdoors" 
            className="relative z-10 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto"
          />
        </div> */}
      </div>
    </div>
  );
}

export default Hero;