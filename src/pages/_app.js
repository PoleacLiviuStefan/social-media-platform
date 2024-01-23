import '@/styles/globals.css'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar/Navbar';
import { UserContextProvider } from '../UserContext';
import axios from 'axios'
import { useRouter } from 'next/router';
// ... inside your Next.js page or another component
export default function App({ Component, pageProps }) {
  axios.defaults.baseURL = "https://www.api.thler.com/api"; //live http://localhost:3001/api
  axios.defaults.withCredentials = true;


  return (
  <>
  <UserContextProvider>
  <Navbar />
  <Component {...pageProps} />
  </UserContextProvider>
  </>)
}


