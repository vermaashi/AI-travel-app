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
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.error(error),
  });

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
      setUser(response.data); // Update user state
      setOpenDialog(false);
      // await OnGenerateTrip(); // Uncomment if needed
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Update user state
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href="/">
        <img src='freepik-doodle-linear-trippod-online-price-comparison-logo-20250610182827AL7i.png' alt="Logo" className='h-[50px] w-[250px] object-cover'/>
      </a>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
            <Button variant="outline" className='rounded-full'>+ create Trips</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="User" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button onClick={() => setOpenDialog(true)}>Sign in</button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="text-center">
              <img src="logo.svg" alt="logo" className="mx-auto"/>
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the app with Google Authentication</p>
              <button 
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center p-2 border rounded-lg'
              >
                <FcGoogle className='h-7 w-7'/> Sign In with Google
              </button>
            </DialogDescription>  
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
