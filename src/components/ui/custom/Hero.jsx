import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font font-extrabold text-[100px] text-center mt-16 '>
        <span className='text-[#f56551]'>Discover your next adventure with AI:</span> Personalized Itineraries at your fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to='/create-trip'>
        <Button>Get Started, It's Free</Button>
      </Link>
      <img src="/person-working-laptop-outdoors.jpg" alt="Road trip vacation" className='h-[350px] w-[350px] rounded-2xl object-cover' />
    </div>
  );
}

export default Hero;
