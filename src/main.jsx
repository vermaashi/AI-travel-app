import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateTrip from './create-trip/index.jsx';
import Viewtrip from './view-trip/[tripId]';
import MyTrips from './my-trips';
import Hero from './components/ui/custom/Hero';
import RootLayout from './RootLayout.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      {
        index: true, 
        element: <Hero />,
      },
      {
        path: 'create-trip', 
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