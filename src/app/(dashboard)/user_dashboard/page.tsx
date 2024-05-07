"use client";

import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import DashCards from './Card';
import decodeToken from '@/utils/decodeToken';

const BuyerDashboard = () => {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    const accountType: string | null = localStorage.getItem('accountType');

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
      } else {
        if (accountType === 'buyer') {
          setUserId(decodedToken.id);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('accountType');
          router.push('login/user_login');
        }
      }
    } else {
      router.push('/login/user_login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className='min-h-screen place-items-center flex gap-3 flex-col pt-10'>
        <h1 className="text-2xl font-bold"> Welcome to your dashboard</h1>
        <p className="text-gray-600">Here you can manage your orders and view your favourite products.</p>

        <div className='flex flex-col md:flex-row gap-7 px-7 mt-10'>
          <DashCards 
            svg={
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="mb-4 h-12 w-12 text-gray-900"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            }
            title='Favourites'
            content='View your favourite products here. Click the button below to view them.'
            link='/user_dashboard/favourites'
            button='View'
          />
          <DashCards
            svg={
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className='mb-4 h-12 w-12 text-gray-900'
              >
                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
              </svg>
            }
            title='Orders'
            content='View your orders here. Click the button below to view them.'
            link='/user_dashboard/orders'
            button='View'
          />
        </div>
        <Button
          color="red"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('accountType');
            router.push('login/user_login');
          }}
        >
          Logout
        </Button>
      </div>
      <Footer />
    </>
  )
}

export default BuyerDashboard;

// TODO: Features for Buyer Dashboard - Favourites, Orders, Logout