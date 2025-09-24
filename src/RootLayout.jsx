import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/ui/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  );
};

export default RootLayout;