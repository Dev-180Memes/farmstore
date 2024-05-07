import React from 'react';
import { Navbar, Footer } from '@/components';
import SignupCard from './Card';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen place-items-center justify-center flex gap-7 flex-col md:flex-row">
        <SignupCard 
          title='Farmer Login'
          header='Login into Farmer Account'
          content='Farmer account is for those who want to sell their farm produce. Login to start selling.'
          signupLink='/login/farmer_login'
        />
        <SignupCard 
          title='Buyer Login'
          header='Login into Buyer Account'
          content='Buyer account is for those who want to buy farm produce. Login to start buying.'
          signupLink='/login/user_login'
        />
      </div>
      <Footer />
    </>
  )
}

export default Login;