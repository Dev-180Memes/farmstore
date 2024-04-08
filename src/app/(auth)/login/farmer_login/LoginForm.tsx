"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Input } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { FarmerLogin } from './action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import decodeToken from '@/utils/decodeToken';

const LoginForm = () => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur)

    const router = useRouter();

    useEffect(() => {
      // Check if user is already logged in
      const token: string | null = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        // Check if token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('accountType');
        } else {
          if (localStorage.getItem('accountType') === 'farmer') {
            router.push('/farmer_dashboard');
          } else {
            router.push('/user_dashboard');
          }
        }
      }
    }, [router]);

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Farmer Login
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form 
          action={async (formData) => {
            try {
              const result = await FarmerLogin(formData);
              localStorage.setItem('token', result.token);
              localStorage.setItem('accountType', result.accountType);
              toast.success('Login successful');
              router.push('/farmer_dashboard');
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
          className="mx-auto max-w-[24rem] text-left"
        >
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
          <Button color="gray" type='submit' size="lg" className="mt-6" fullWidth>
            sign in
          </Button>
          {/* <div className="mt-4 flex justify-end">
            <Typography
              as="a"
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
            Not registered?{" "}
            <Link href="/signup/create_farmer_account" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default LoginForm;