"use client";

import React, { useState, useEffect } from 'react'
import { Navbar, Footer } from '@/components';
import { Typography } from '@material-tailwind/react';
import { ProductCard } from '@/components';
import { fetchProducts, getRecommendations } from './Products';
import { FlattenMaps } from 'mongoose';
import Link from 'next/link';
import decodeToken from '@/utils/decodeToken';
import {
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";

const Products = () => {
  const [products, setProducts] = useState<Array<FlattenMaps<any> & Required<{ _id: unknown; }>>>([]);
  const [recommendProducts, setRecommendProducts] = useState<Array<FlattenMaps<any> & Required<{ _id: unknown; }>>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>("All");
  const [categories, setCategories] = React.useState<string[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });

    // Check if user is logged in
    const token: string | null = localStorage.getItem('token');
    const accountType: string | null = localStorage.getItem('accountType');

    if (accountType === 'buyer' && token) {
      const decodedToken = decodeToken(token);

      // Check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("accountType");
        return
      } else {
        setIsLoggedIn(true);

        // Get recommendations
        getRecommendations(decodedToken.id)
          .then((recommendations) => {
            setRecommendProducts(recommendations.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  useEffect(() => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    setCategories(["All", ...uniqueCategories]);
  }, [products]);

  console.log(recommendProducts);

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
          {isLoggedIn ? (
            <div className="mb-5 border-b-2 border-gray-500 pb-7">
              <Typography variant='h4' className='my-4 text-2xl'>
                Produce We Think You Might Like
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {recommendProducts.map((product) => (
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
          ) : (
            <div />
          )}
          <Typography variant='h4' className='my-4 text-2xl'>
            All Products
          </Typography>
          <div className="mt-5 mb-5 flex items-center">
            <Tabs value={activeTab} className="w-full lg:w-8/12">
              <div className="overflow-x-auto">
                <TabsHeader
                  className="h-12 bg-transparent"
                  indicatorProps={{
                    className: "!bg-gray-900 rounded-lg",
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      value={category}
                      className={`!font-medium capitalize transition-all duration-300
                        ${activeTab === category ? "text-white" : "capitalize"}
                      `}
                      onClick={() => setActiveTab(category)}
                    >
                      {category}
                    </Tab>
                  ))}
                </TabsHeader>
              </div>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            {products.filter((product) => activeTab === "All" || product.category === activeTab).map((product) => (
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