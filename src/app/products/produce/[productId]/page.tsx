"use client";

import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components';
import { fetchProducts, getSimilarProducts } from '../products';
import { Button, IconButton, Rating, Typography } from "@material-tailwind/react";
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ProductCard from '@/components/product-card';
import toast, { Toaster } from 'react-hot-toast';
import decodeToken from '@/utils/decodeToken';
import { addFavourite, removeFavourite, checkIsFavourites } from './favourites';

const Produce = ({ params }: { params: any }) => {
    const [product, setProduct] = useState<any>();
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    useEffect(() => {
        fetchProducts(params.productId)
            .then((product) => {
                setProduct(product);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.productId]);

    useEffect(() => {
        if (!product) return;

        getSimilarProducts(product.category, product._id)
            .then((products) => {
                setSimilarProducts(products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [product]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const accountType = localStorage.getItem('accountType');

        if (!token || !accountType || accountType !== 'buyer') {
            return;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken) {
            return;
        }

        checkIsFavourites(decodedToken.id, product?._id)
            .then((isFavourite) => {
                setIsFavourite(isFavourite);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isFavourite, product]);

    const handleFavourite = async () => {
        const token = localStorage.getItem('token');
        const accountType = localStorage.getItem('accountType');

        if (!token || !accountType || accountType !== 'buyer') {
            toast.error('Please login as a Buyer to add to favourites');
            return;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken) {
            toast.error('Invalid token');
            return;
        }

        if (isFavourite) {
            removeFavourite(decodedToken.id, product._id)
                .then(() => {
                    setIsFavourite(false);
                    toast.success('Product removed from favourites');
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to remove product from favourites');
                });
        } else {
            addFavourite(decodedToken.id, product._id)
                .then(() => {
                    setIsFavourite(true);
                    toast.success('Product added to favourites');
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to add product to favourites');
                });
        }
    }

    return (
        <>
            <Navbar />
            <section className="py-16 px-8 min-h-screen">
                <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        // Make sure image is responsive
                        className="h-[36rem] w-[36rem] object-contain md:h-[24rem] md:w-[24rem]"
                    />
                    <div>
                        <Typography className="mb-3" variant="h3">
                            {product?.name}
                        </Typography>
                        <Typography variant="h5">
                            ${product?.price}
                        </Typography>
                        <Typography className="mt-4 text-base font-normal leading-[27px] !text-gray-500">
                            {product?.long_description}
                        </Typography>
                        <br />
                        <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                            <Button color="gray" className="w-52">
                                Add to Cart
                            </Button>
                            <IconButton color="gray" variant="text" className="shrink-0">
                                {/* <HeartIcon className="h-6 w-6" /> */}
                                {isFavourite ? (
                                    <HeartIconSolid 
                                        color='#ff0000' 
                                        className="h-6 w-6" 
                                        onClick={handleFavourite}
                                    />
                                ) : (
                                    <HeartIcon 
                                        className="h-6 w-6" 
                                        onClick={handleFavourite}
                                    />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <Typography variant="h4">Similar Products</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        {similarProducts.map((product) => (
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
            <Toaster />
        </>
    )
}

export default Produce;