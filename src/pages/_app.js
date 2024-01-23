import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar/Navbar';
import { UserContextProvider } from '../UserContext';
import axios from 'axios'
import CheckAge from '../components/CheckAge/CheckAge';
import { useRouter } from 'next/router';
// ... inside your Next.js page or another component
export default function App({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:3001/api"; //live https://www.api.thler.com/api
  axios.defaults.withCredentials = true;
  const [ageConfirmed, setAgeConfirmed] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const ageConfirmation = Cookies.get('ageConfirmed');
    setAgeConfirmed(ageConfirmation === 'true');
    if (ageConfirmation === 'true' && router.pathname === '/') {
      router.replace('/explore'); // Replace with your desired route
    }
  }, []);

  const handleAgeConfirmation = () => {
    Cookies.set('ageConfirmed', 'true', { expires: 36500 });
    setAgeConfirmed(true);
  };

  if (ageConfirmed === null) {
    return <div>Loading...</div>;
  }

  if (!ageConfirmed) {
    return <CheckAge checkAgeToParent={handleAgeConfirmation} />
  }

  return (
  <>
  <UserContextProvider>
  <Navbar />
  <Component {...pageProps} />
  </UserContextProvider>
  </>)
}
