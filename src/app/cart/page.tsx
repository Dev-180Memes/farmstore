"use client";

import React, { useState, useEffect } from 'react'
import { Navbar, Footer } from '@/components';
import { getCart, updateQuantity, removeFromCart, clearCart } from '@/utils/cartUtils';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
  CardFooter
} from "@material-tailwind/react";
import decodeToken from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import getUserDetails from './user';
import createOrder from './createOrder';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const cart = getCart();

    setCart(cart);
  }, []);

  useEffect(() => {
    // Calculate total price of items in cart
    const totalPrice = cart.reduce((acc, item) => {
      return acc + (item.price as number * item.quantity as number);
    }, 0);

    setTotal(totalPrice);
  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      const decodedToken = decodeToken(token);

      getUserDetails(decodedToken.id)
        .then((user) => {
          setEmail(user.email);
          setName(user.name);
          setPhone(user.phone);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [])

  const config = {
    public_key: 'FLWPUBK_TEST-2c5daf874a1332e159d7454a2e45ce23-X',
    tx_ref: Date.now(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: 'FarmFood Hub Checkout',
      descritption: 'Payment for Items in Cart'
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleAddQuatity = (id, quantity) => {
    updateQuantity(id, quantity+1);
    setCart(cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item;
    }));
  }

  const handleRemoveQuantity = (id, quantity) => {
    updateQuantity(id, quantity-1);
    setCart(cart.map((item) => {
      // Check if quantity is greater than 1
      if (item._id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      } else if (item._id === id && item.quantity === 1) {
        removeFromCart(id);
        setCart(cart.filter((item) => item._id !== id));
      }
    }));
  }

  const handleDelete = (id) => {
    removeFromCart(id);
    setCart(cart.filter((item) => item._id !== id));
  }

  const HandleCheckout = () => {
    //TODO: Check if user is logged in
    //TODO: Redirect to checkout page
    //TODO: Send cart data to backend and create order
    //TODO: Clear cart after order created successfully
    const token: string | null = localStorage.getItem('token');

    if (token) {
      const decodedToken = decodeToken(token);
      // Check if token has expired
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        toast.error('Session expired. Please login again.');
        router.push('/login/user_login');
        return;
      } else {
        const cart = getCart();
        if (cart.length === 0) {
          toast.error('Cart is empty. Add items to cart to checkout.');
          return;
        }

        handleFlutterPayment({
          callback: (response) => {
            createOrder(cart, decodedToken.id, response.tx_ref)
              .then((res) => {
                if (res) {
                  clearCart();
                  toast.success('Order created successfully.');
                  router.push('/user_dashboard/orders');
                }
              })
              .catch((error) => {
                console.error(error);
              })
            closePaymentModal()
          },
          onClose: () => {},
        });
      }
    } else {
      toast.error("You need to login to checkout.")
      router.push('/login/user_login');
      return
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen place-items-center flex gap-3 flex-col pt-10">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="text-gray-600">Here you can view your cart and proceed to checkout.</p>

        <div className="flex flex-col md:flex-row gap-7 px-7 mt-10">
          <Card className="w-96">
            <List>
              {cart.map((item, index) => (
                <ListItem key={index}>
                    <ListItemPrefix>
                        <Avatar variant="circular" alt="" src={item.image} />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            {item.name}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Price: ₦{item.price}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Quantity: {item.quantity}
                        </Typography>
                        <div className="flex flex-row gap-2 my-3">
                            <Button onClick={() => handleAddQuatity(item._id, item.quantity)} className="p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Button>
                            <Button onClick={() => handleRemoveQuantity(item._id, item.quantity)} className="p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                </svg>
                            </Button>
                            <Button 
                                onClick={() => handleDelete(item._id)} 
                                color="red" 
                                // Make buttons smaller
                                className="p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </ListItem>
              ))}
            </List>
            <CardFooter>
              <Typography variant='h6' color='blue-gray'>
                Total: ₦{total}
              </Typography>
              <Button onClick={() => HandleCheckout()}>
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Cart;