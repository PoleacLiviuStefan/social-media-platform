import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import CheckAge from '../components/CheckAge/CheckAge';
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Assuming the age confirmation status is stored in a cookie
    // This will only run on the client side
    const ageConfirmation = document.cookie.split('; ').find(row => row.startsWith('ageConfirmed='));
    if (ageConfirmation) {
      setAgeConfirmed(ageConfirmation.split('=')[1] === 'true');
    }
    if (ageConfirmation === 'true' && router.pathname === '/') {
      router.replace('/explore'); // Replace with your desired route
    }
  }, []);

  if (!ageConfirmed) {
    return <CheckAge onConfirm={() => setAgeConfirmed(true)} />;
  }
  else
    router.replace("")

  return (
    <>
    </>
  );
}

export async function getServerSideProps(context) {
  const ageConfirmed = context.req.cookies['ageConfirmed'];

  if (ageConfirmed !== 'true') {
    // Redirect to age check page if age is not confirmed
    return {
      redirect: {
        destination: '/age-check',
        permanent: false,
      },
    };
  }

  // Continue with normal page load
  return { props: {} };
}
