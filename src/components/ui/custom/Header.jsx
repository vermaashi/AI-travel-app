import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut, FiPlus, FiBriefcase } from 'react-icons/fi';
import logo from '../../../assets/a.svg';
import { Link } from 'react-router-dom'; 


// Reusable Google Login Component
const GoogleLoginDialog = ({ open, onOpenChange, onSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => onSuccess(tokenInfo),
    onError: (error) => console.error(error),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-orange-500/30 rounded-2xl text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="h-12" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Welcome to Travel AI
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Sign in to create and manage your personalized travel itineraries
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <button 
            onClick={login}
            className="w-full flex items-center justify-center gap-3 p-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 border border-gray-300"
          >
            <FcGoogle className="h-6 w-6" />
            <span>Sign In with Google</span>
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="bg-orange-500/10 p-2 rounded-full inline-flex">
                <FiPlus className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-xs text-gray-300 mt-2">Create Trips</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/10 p-2 rounded-full inline-flex">
                <FiBriefcase className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-xs text-gray-300 mt-2">Save Itineraries</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/10 p-2 rounded-full inline-flex">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-xs text-gray-300 mt-2">Access Anywhere</p>
            </div>
          </div> 
        </div>
      </DialogContent>
    </Dialog>
  );
};

function Header() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });      
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className='bg-gradient-to-r from-gray-900 to-black p-4 shadow-lg border-b border-orange-500/20'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* <a href="/" className="flex items-center group"> */}
        <Link to="/" className="flex items-center group">
          <img src={logo} alt="Logo" className="h-12 transition-transform group-hover:scale-110 "/></Link>
        {/* </a> */}
        
        <div>
          {user ? (
            <div className='flex items-center gap-4'>
              <Link  to="/create-trip">
                <Button className="rounded-full bg-gradient-to-r from-orange-500 to-[#f56551] hover:from-orange-600 hover:to-[#e05541] text-white px-5 py-2 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-orange-500/30 flex items-center gap-2">
                  <FiPlus className="h-4 w-4" />
                  Create Trip
                </Button>
              </Link>
              <Link to="/my-trips">
                <Button variant="outline" className='rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-5 py-2 font-medium transition-all duration-300 flex items-center gap-2'>
                  <FiBriefcase className="h-4 w-4" />
                  My Trips
                </Button>
              </Link>
              
              <Popover>
                <PopoverTrigger className="focus:outline-none">
                  <div className="relative group">
                    <img 
                      src={user?.picture} 
                      className='h-10 w-10 rounded-full border-2 border-orange-500/30 transition-all duration-300 group-hover:border-orange-500' 
                      alt="User" 
                    />
                    <div className="absolute inset-0 bg-orange-500/0 rounded-full group-hover:bg-orange-500/20 transition-all duration-300"></div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-gray-900 border border-orange-500/30 rounded-xl p-3 w-40">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-medium text-sm truncate">{user?.name}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-2 flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors duration-200"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <button 
              onClick={() => setOpenDialog(true)}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-[#f56551] text-white rounded-full font-medium hover:from-orange-600 hover:to-[#e05541] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-orange-500/30"
            >
              Sign In
            </button>
          )}
        </div>
        
        <GoogleLoginDialog 
          open={openDialog} 
          onOpenChange={setOpenDialog} 
          onSuccess={GetUserProfile} 
        />
      </div>
    </div>
  );
}

export default Header;