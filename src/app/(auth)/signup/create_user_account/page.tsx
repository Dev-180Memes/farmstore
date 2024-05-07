import React from 'react'
import { Navbar, Footer } from '@/components';
import SignupForm from './SignupForm';

const CreateUser = () => {
  return (
    <>
      <Navbar />
      <SignupForm />
      <Footer />
    </>
  )
}

export default CreateUser;