import React from 'react'
import { Navbar, Footer } from '@/components';
import LoginForm from './LoginForm';

const FarmerLogin = () => {
  return (
    <>
        <Navbar />
        <LoginForm />
        <Footer />
    </>
  )
}

export default FarmerLogin;