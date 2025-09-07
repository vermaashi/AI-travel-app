import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips'
import Hero from './components/ui/custom/Hero'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero/>, 
  },
  {
    path: '/create-trip',
    element:<CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip/>
  },
  {
    path:'/my-trips',
    element: <MyTrips/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header />
    <Toaster/>
    <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
  </div>
)
  