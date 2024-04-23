"use client";

import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";

interface Props {
    title: string;
    desc: string;
    button: string;
    link: string;
    onClick?: () => void;
}

const DashBoardCard = ({ title, desc, button, link, onClick } : Props) => {
    const isModal = link === "modal";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isModal && onClick) {
            e.preventDefault();
            onClick();
        }
    }
  return (
    <Card className="w-auto max-w-[24rem]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography
            color="blue-gray"
            className="mt-1 mb-2 text-[20px] font-bold"
          >
            {title}
          </Typography>
        </CardHeader>
        <CardBody className="px-4 pt-0">
          <Typography className="font-normal text-gray-600">
            {desc}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 px-4">
            {isModal ? (
            <Button onClick={handleClick}>{button}</Button>
            ) : (
            <Link href={link}>
                <Button>{button}</Button>
            </Link>
            )}
        </CardFooter>
      </Card>

  )
}

export default DashBoardCard;