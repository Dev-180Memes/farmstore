"use client";

import React from 'react'
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
import getUsersOrder, { markOrderAsDelivered } from './orders';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  const router = useRouter();

  React.useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');

    if (accountType !== 'buyer') router.push('/login/user_login');

    if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            localStorage.removeItem('accountType');
        } else {
          getUsersOrder(decodedToken.id)
            .then((response) => {
              setOrders(response);
            })
            .catch((error) => {
              console.error(error)
            })
        }
    } else {
        router.push('/login/user_login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen place-items-center flex gap-3 flex-col pt-10">
        <h1 className="text-2xl font-bold">Your Orders</h1>

        <div className="m-10">
          <Card className="h-full w-full">
            <CardHeader
              floated={false}
              shadow={false}
              className='rounded-none flex flex-wrap gap-4 justify-between mb-4'
            >
              <div>
                <Typography variant='h6' color='blue-gray'>
                  My Orders
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 font-normal mt-1"
                >
                  Here are all your orders
                </Typography>
              </div>
            </CardHeader>
            <CardBody className='overflow-scroll !px-0 py-2'>
              <table className='w-full min-w-max table-auto'>
                <thead>
                  <tr>
                    <th className='border-b border-gray-300 !p-4 pb-8 !text-left'>
                      <Typography
                        color='blue-gray'
                        variant='small'
                        className='!font-bold'
                      >
                        OrderId
                      </Typography>
                    </th>
                    <th className='border-b border-gray-300 !p-4 pb-8 text-left'>
                    <Typography
                        color='blue-gray'
                        variant='small'
                        className='!font-bold'
                      >
                        Produce
                      </Typography>
                    </th>
                    <th className='border-b border-gray-300 !p-4 pb-8 text-left'>
                    <Typography
                        color='blue-gray'
                        variant='small'
                        className='!font-bold'
                      >
                        Quantity
                      </Typography>
                    </th>
                    <th className='border-b border-gray-300 !p-4 pb-8 text-left'>
                    <Typography
                        color='blue-gray'
                        variant='small'
                        className='!font-bold'
                      >
                        Status
                      </Typography>
                    </th>
                    <th className='border-b border-gray-300 !p-4 pb-8 text-left'>
                    <Typography
                        color='blue-gray'
                        variant='small'
                        className='!font-bold'
                      >
                        Actions
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className='border-b border-gray-200'>
                      <td className="!p-4">
                        <Typography
                          color='blue-gray'
                          variant='small'
                          className='!font-bold'
                        >
                          {order.transactionRef}
                        </Typography>
                      </td>
                      <td className="!p-4">
                        <Typography
                          color='blue-gray'
                          variant='small'
                          className='!font-bold'
                        >
                          {order.produce.name}
                        </Typography>
                      </td>
                      <td className="!p-4">
                        <Typography
                          color='blue-gray'
                          variant='small'
                          className='!font-bold'
                        >
                          {order.quantity}
                        </Typography>
                      </td>
                      <td className="!p-4">
                        <Typography
                          color='blue-gray'
                          variant='small'
                          className='!font-bold'
                        >
                          {order.status}
                        </Typography>
                      </td>
                      <td className="!p-4">
                        {order.status === "Not Delivered" ? (
                          <Button
                            color='blue'
                            buttonType='link'
                            size='regular'
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple='light'
                            onClick={() => {
                              markOrderAsDelivered(order._id)
                                .then((response) => {
                                  toast.success(response.message);
                                  getUsersOrder(order.user)
                                    .then((response) => {
                                      setOrders(response);
                                    })
                                    .catch((error) => {
                                      console.error(error)
                                    })
                                })
                                .catch((error) => {
                                  console.error(error)
                                })
                            
                            }}
                          >
                            Mark as Delivered
                          </Button>
                        ) : (
                          <Typography
                            variant='small'
                            color='green'
                            className='!font-bold'
                          >
                            Delivered
                          </Typography>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Orders;