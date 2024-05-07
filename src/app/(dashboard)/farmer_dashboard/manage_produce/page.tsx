"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar, Footer } from '@/components';
import { 
    Button,
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import decodeToken from '@/utils/decodeToken';
import fetchProduce, { DeleteProduce } from './fetchProduce';
import toast from 'react-hot-toast';
import { IProduce } from '@/models/Produce';
import Link from 'next/link';
import Image from 'next/image';
import {
    TrashIcon
} from '@heroicons/react/20/solid';

const ManageProduce = () => {
    const [produce, setProduce] = React.useState<IProduce[]>([]);
    const [farmerId, setFarmerId] = React.useState<string>("");
    const router = useRouter();

    const TABLE_HEAD = [
        {
            head: "Produce Name",
            customStyle: "!text-left",
        },
        {
            head: "Description",
            customStyle: "text-left",
        },
        {
            head: "Category",
            customStyle: "text-left",
        },
        {
            head: "Price",
            customStyle: "text-left",
        },
        {
            head: "Actions",
            customStyle: "text-left",
        }
    ]

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

        if (farmerId === "") return;

        fetchProduce(farmerId)
            .then((data: IProduce[]) => {
                setProduce(data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, [farmerId, router]);

    // console.log(produce)

  return (
    <>
        <Navbar />
        <section className="min-h-screen m-10">
            <Card className='h-full w-full'>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className='rounded-none flex flex-wrap gap-4 justify-between mb-4'
                >
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Manage Produce
                        </Typography>
                        <Typography
                            variant='small'
                            className='text-gray-600 font-normal mt-1'
                        >
                            Manage your farm produce. See list of all your farm produce and delete produce that are no longer in stock
                        </Typography>
                    </div>
                    <Link href="/farmer_dashboard/add_produce">
                        <Button
                            color="blue"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            className="w-36"
                        >
                            Add Produce
                        </Button>
            
                    </Link>
                </CardHeader>
                <CardBody className="overflow-scroll !px-0 py-2">
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map(({ head, customStyle }) => (
                                    <th
                                        key={head}
                                        className={`border-b border-gray-300 !p-4 pb-8 ${customStyle}`}
                                    >
                                        <Typography
                                            color="blue-gray"
                                            variant="small"
                                            className="!font-bold"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {produce.map((produce) => (
                                <tr key={produce.id} className="border-b border-gray-200">
                                    <td className="!p-4">
                                        <div className="flex items-center gap-4 text-left">
                                            <Image
                                                src={produce.image}
                                                alt={produce.name}
                                                width={50}
                                                height={50}
                                                className="border rounded-md p-1 h-10 w-10" 
                                            />
                                            <Typography
                                                color="blue-gray"
                                                variant="small"
                                                className="!font-bold"
                                            >
                                                {produce.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className="!p-4">
                                        <Typography
                                            color="blue-gray"
                                            variant="small"
                                            className="!font-bold"
                                        >
                                            {produce.short_description}
                                        </Typography>
                                    </td>
                                    <td className="!p-4">
                                        <Typography
                                            color="blue-gray"
                                            variant="small"
                                            className="!font-bold"
                                        >
                                            {produce.category}
                                        </Typography>
                                    </td>
                                    <td className="!p-4">
                                        <Typography
                                            color="blue-gray"
                                            variant="small"
                                            className="!font-bold"
                                        >
                                            {produce.price}
                                        </Typography>
                                    </td>
                                    <td className="!p-4">
                                        <IconButton
                                            color="blue"
                                            size="sm"
                                            iconOnly
                                            rounded
                                            ripple="light"
                                            className="!p-2"
                                            onClick={() => {
                                                DeleteProduce(produce._id)
                                                    .then(() => {
                                                        toast.success('Produce deleted successfully');
                                                        setProduce((prevProduce) => {
                                                            return prevProduce.filter((item) => item._id !== produce._id);
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        toast.error(error.message);
                                                    });
                                            }}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </section>
        <Footer />
    </>
  )
}

export default ManageProduce;