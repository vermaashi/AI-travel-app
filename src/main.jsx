import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
// import Hero from './components/ui/custom/Hero.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 

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
    element: <MyTrips/>, // Assuming you want to show the same component for 'my-trips'
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Hero/> */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header />
    <Toaster/>
    <RouterProvider router = {router}/>
    </GoogleOAuthProvider>;
    {/* <App /> */}
  </React.StrictMode>,
)
  