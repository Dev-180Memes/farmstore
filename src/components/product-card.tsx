import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import {
    Typography,
    Card,
    CardBody,
    CardHeader,
    Button,
  } from "@material-tailwind/react";
  
  interface ProductCardProps {
    image: string;
    name: string;
    short_description: string;
    category: string;
    price: string;
    _id: string;
  }
  
  export function ProductCard({
    image,
    category,
    name,
    short_description,
    price,
    _id,
  }: ProductCardProps) {
    return (
      <Card color="transparent" shadow={false}>
        <CardHeader color="gray" floated={false} className="mx-0 mt-0 mb-6">
          <Image
            width={500}
            height={500}
            src={image}
            alt={name}
            className="object-cover rounded-lg w-full h-64"
          />
        </CardHeader>
        <CardBody className="p-0">
          <Typography color="blue" className="mb-2 text-xs !font-semibold">
            {category}
          </Typography>
          <a href="#">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-3 font-bold normal-case xl:w-64"
            >
              {name}
            </Typography>
          </a>
          <Typography className="mb-4 font-normal !text-gray-500">
            {/* Show first 20 words of short description */}
            {short_description.split(" ").slice(0, 10).join(" ")}...
          </Typography>
          <div className="flex gap-2">
            <Typography
              variant="h5"
              color="blue-gray"
            >
             ${price}
            </Typography>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              color="lightBlue"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
            >
              Add to Cart
            </Button>

            <Link href={`/products/produce/${_id}`}>
              <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
              >
                View Product
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }
export default ProductCard