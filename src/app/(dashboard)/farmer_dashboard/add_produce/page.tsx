"use client";

import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '@/components';
import { Typography, Input, Button, Textarea, Select, Option } from '@material-tailwind/react';
import { AddProduct } from './action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import decodeToken from '@/utils/decodeToken';

const AddProduce = () => {
    const [farmerId, setFarmerId] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        const accountType = localStorage.getItem('accountType');

        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                localStorage.removeItem('accountType');
            } else {
                if (accountType === 'farmer') {
                    setFarmerId(decodedToken.id);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('accountType');
                    router.push('/login/farmer_login');
                }
            }
        } else {
            router.push('/login/farmer_login');
        }
    }, [router]);

  return (
    <>
        <Navbar />
        <section className="grid text-center min-h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Add Farm Produce
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                    Add your farm produce to the market place
                </Typography>
                <form 
                    action={async (formData: FormData) => {
                        try {
                            const result = await AddProduct(formData, farmerId, category);
                            toast.success(result.message);
                            router.push('/farmer_dashboard');
                        } catch (error: any) {
                            toast.error(error.message);
                        }
                    }}
                    className="mx-auto max-w-[24rem] text-left"
                >
                    <div className="mb-6">
                        <label htmlFor="produce_name">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Produce Name
                            </Typography>
                        </label>
                        <Input
                            id="produce_name"
                            color="gray"
                            size="lg"
                            type="produce_name"
                            name="produce_name"
                            placeholder="Enter produce name"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="short_description">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Short Description
                            </Typography>
                        </label>
                        <Input
                            id="short_description"
                            color="gray"
                            size="lg"
                            type="short_description"
                            name="short_description"
                            placeholder="Enter short description"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="long_description">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Long Description
                            </Typography>
                        </label>
                        <Textarea
                            id="long_description"
                            name="long_description"
                            color="gray"
                            size="md"
                            placeholder="Enter long description"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor='category'>
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Category
                            </Typography>
                        </label>
                        <Select
                            id="category"
                            name="category"
                            label='Select Category'
                            value={category}
                            onChange={(val) => setCategory(val as string)}
                        >
                            <Option value=''>Select Category</Option>
                            <Option value="Vegetables">Vegetables</Option>
                            <Option value="Fruits">Fruits</Option>
                            <Option value="Grains">Grains</Option>
                            <Option value="Dairy">Dairy</Option>
                            <Option value="Meat">Meat</Option>
                            <Option value="Poultry">Poultry</Option>
                            <Option value="Seafood">Seafood</Option>
                            <Option value="Herbs">Herbs</Option>
                            <Option value="Spices">Spices</Option>
                            <Option value="Nuts">Nuts</Option>
                        </Select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="price">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Price
                            </Typography>
                        </label>
                        <Input
                            id="price"
                            color="gray"
                            size="lg"
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Image
                            </Typography>
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                        />
                    </div>
                
                    <Button color="gray" size="lg" className="mt-6" type="submit" fullWidth>
                        Submit
                    </Button>
                </form>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default AddProduce;