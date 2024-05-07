"use client";

import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components';
import { useRouter } from 'next/navigation';
import decodeToken from '@/utils/decodeToken';
import { fetchFavourites } from '@/app/products/produce/[productId]/favourites';
import { Typography } from '@material-tailwind/react';
import { ProductCard } from '@/components';

const Favourites = () => {
  const [userId, setUserId] = useState<string>("");
  const [favourites, setFavourites] = useState<any[]>([]);
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

  useEffect(() => {
    if (userId) {
      fetchFavourites(userId)
        .then((res) => {
          setFavourites(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId])

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-10 px-8">
        <div className="mx-auto text-center mb-16">
          <Typography className="font-medium text-lg">
            Your Favourites
          </Typography>
          <Typography variant="h1" className="my-4 text-4xl">
            Produce You Love
          </Typography>
          <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
            Simplify your shopping experience with our intuitive filter system.
            Whether you&apos;re looking for specific produce, price ranges, or
            brands.
          </Typography>
        </div>
        <div className="mx-auto container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols">
            {favourites.map((product) => (
              <ProductCard
                key={product._id}
                image={product.image}
                category={product.category}
                name={product.name}
                short_description={product.short_description}
                price={product.price}
                _id={product._id}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Favourites;