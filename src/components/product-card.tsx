import React from 'react';
import Image from "next/image";

import {
    Typography,
    Card,
    CardBody,
    CardHeader,
  } from "@material-tailwind/react";
  
  interface ProductCardProps {
    img: string;
    title: string;
    desc: string;
    category: string;
    price: string;
  }
  
  export function ProductCard({
    img,
    category,
    title,
    desc,
    price,
  }: ProductCardProps) {
    return (
      <Card color="transparent" shadow={false}>
        <CardHeader color="gray" floated={false} className="mx-0 mt-0 mb-6">
          <Image
            width={500}
            height={500}
            src={img}
            alt={title}
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
              {title}
            </Typography>
          </a>
          <Typography className="mb-4 font-normal !text-gray-500">
            {desc}
          </Typography>
          <div className="flex gap-2">
            <Typography
              variant="h5"
              color="blue-gray"
            >
             ${price}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }
export default ProductCard