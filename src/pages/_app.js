import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar/Navbar';
import { UserContextProvider } from '../UserContext';
import axios from 'axios'
import { useRouter } from 'next/router';
// ... inside your Next.js page or another component
export default function App({ Component, pageProps }) {
  axios.defaults.baseURL = "https://api.waygital.ro/api"; //test http://localhost:3001/api
  axios.defaults.withCredentials = true;
  const router = useRouter();
  useEffect(() => {
    // Check if the current path is the homepage ('/')
    window.scrollTo({top:0,left:0})
    if (router.pathname === '/') {
      // Navigate to the '/explore' route
      router.replace('/explore');
    }
  }, [router]); // Dependency array includes router to re-run effect if the route changes

  return (
  <>
  <UserContextProvider>
  <Navbar />
  <Component {...pageProps} />
  </UserContextProvider>
  </>)
}


