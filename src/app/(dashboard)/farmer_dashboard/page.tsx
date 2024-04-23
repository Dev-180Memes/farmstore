"use client";

import { Navbar, Footer } from '@/components';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useRouter } from 'next/navigation';
import decodeToken from '@/utils/decodeToken';

const FarmerDashboard = () => {
  const [farmerId, setFarmerId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
      } else {
        if (accountType === 'farmer') {
          setFarmerId(decodedToken.id);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('accountType');
          router.push('login/farmer_login');
        }
      }
    } else {
      router.push('login/farmer_login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen place-items-center flex gap-3 flex-col pt-10">
        <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
        <p className="text-gray-600">Here you can manage your farm produce and orders.</p>

        <div className="flex flex-col md:flex-row gap-7 px-7 mt-10">
          <Card 
            title='Add Farm Produce'
            desc='Add your farm produce to the market place'
            button='Add Produce'
            link='/farmer_dashboard/add_produce'
          />
          <Card 
            title='View Orders'
            desc='View orders placed by customers'
            button='View Orders'
            link='/farmer_dashboard/view_orders'
          />
          <Card 
            title='Manage Produce'
            desc='Manage your farm produce'
            button='Manage Produce'
            link='/farmer_dashboard/manage_produce'
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FarmerDashboard;