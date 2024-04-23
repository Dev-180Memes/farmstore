import React from 'react'
import { Navbar, Footer } from '@/components';
import LoginForm from './LoginForm';

const UserLogin = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  )
}

export default UserLogin;