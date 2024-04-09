import React from 'react'
import { Navbar, Footer } from '@/components/index'
import SignupCard from './Card'

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen place-items-center justify-center flex gap-7 flex-col md:flex-row">
        <SignupCard 
          title="Farmer Account"
          header='Create Farmer Account'
          content='Farmer account is for those who want to sell their farm produce. Create an account to start selling.'
          signupLink='/signup/create_farmer_account'
        />
        <SignupCard 
          title="Buyer Account"
          header='Create Buyer Account'
          content='Buyer account is for those who want to buy farm produce. Create an account to start buying.'
          signupLink='/signup/create_user_account'
        />
      </div>
      <Footer />
    </>
  )
}

export default Signup;