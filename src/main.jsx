import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import all your page components
import CreateTrip from './create-trip/index.jsx';
import Viewtrip from './view-trip/[tripId]';
import MyTrips from './my-trips';
import Hero from './components/ui/custom/Hero';
import RootLayout from './RootLayout.jsx'; // 👈 Import the new layout component

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 👈 Use the RootLayout here
    children: [
      {
        index: true, // This makes <Hero /> the default component for the '/' path
        element: <Hero />,
      },
      {
        path: 'create-trip', // The path is relative to the parent path ('/')
        element: <CreateTrip />,
      },
      {
        path: 'view-trip/:tripId',
        element: <Viewtrip />,
      },
      {
        path: 'my-trips',
        element: <MyTrips />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);