"use client";

import React, { useState } from 'react';
import {
    Typography,
    Button,
    Input
} from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createFarmerAccount } from './action';

const SignupForm = () => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const toggleConfirmPasswordVisiblity = () => setConfirmPasswordShown((cur) => !cur);

    const router = useRouter();

  return (
    <section className="grid text-center h-screen items-center p-8 mb-10">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Create Farmer Account
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Fill the form to create farmer account
        </Typography>
        <form 
          // Call server action and handle responses
          action={async (formData) => {
            try {
              const result = await createFarmerAccount(formData);
              localStorage.setItem('token', result.token);
              localStorage.setItem('accountType', result.accountType)
              toast.success('Account created successfully');
              router.push('/farmer_dashboard');
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
          
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Name
              </Typography>
            </label>
            <Input
              id="name"
              color="gray"
              size="lg"
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              id='password'
              name='password'
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password">
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size='lg'
              placeholder='********'
              id='confirm-password'
              name='confirm-password'
              labelProps={{
                className: 'hidden'
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              type={confirmPasswordShown ? 'text' : 'password'}
              icon={
                <i onClick={toggleConfirmPasswordVisiblity}>
                  {confirmPasswordShown ? (
                    <EyeIcon className='h-5 w-5' />
                  ) : (
                    <EyeSlashIcon className='h-5 w-5' />
                  )}
                </i>
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Phone Number
              </Typography>
            </label>
            <Input
              id="phone"
              color="gray"
              size="lg"
              type="tel"
              name="phone"
              placeholder="08012345678"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Address
              </Typography>
            </label>
            <Input
              id="address"
              color="gray"
              size="lg"
              type="text"
              name="address"
              placeholder="123, Main Street, Lagos"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <Button type='submit' color="gray" size="lg" className="mt-6" fullWidth>
            Create Account
          </Button>
          {/* <div className="mt-4 flex justify-end">
            <Typography
              as="Link"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div> */}
          <Typography
            variant="small"
            color="gray"
            className="mt-4 text-center font-normal"
          >
            <Link href="/login/user_login" className="font-medium text-gray-900">
              Login as Shopper Instead
            </Link>
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="mt-4 text-center font-normal"
          >
            Already registered?{" "}
            <Link href="/login/farmer_login" className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default SignupForm;