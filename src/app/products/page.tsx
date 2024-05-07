"use client";

import React, { useState, useEffect } from 'react'
import { Navbar, Footer } from '@/components';
import { Typography } from '@material-tailwind/react';
import { ProductCard } from '@/components';
import { fetchProducts } from './Products';
import { FlattenMaps } from 'mongoose';
import Link from 'next/link';

const Products = () => {
  const [products, setProducts] = useState<Array<FlattenMaps<any> & Required<{ _id: unknown; }>>>([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <section className="min-h-screen py-10 px-8">
        <div className="mx-auto text-center mb-16">
          <Typography className="font-medium text-lg">
            Shop Fresh Farm Produce
          </Typography>
          <Typography variant="h1" className="my-4 text-4xl">
            Find What You Need
          </Typography>
          <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
            Simplify your shopping experience with our intuitive filter system.
            Whether you&apos;re looking for specific produce, price ranges, or
            brands.
          </Typography>
        </div>
        <div className="mx-auto container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product._id} // Add key prop with a unique value
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

export default Products;