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
import Link from 'next/link';

const SignupCard = ({ title, header, content, signupLink }: { title: string, header: string, content: string, signupLink: string }) => {
  return (
    <>
        <Card className="w-auto max-w-[24rem]">
            <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
            >
                {title}
            </Typography>
            <Typography
                color="blue-gray"
                className="mt-1 mb-2 text-[20px] font-bold"
            >
                {header}
            </Typography>
            </CardHeader>
            <CardBody className="px-4 pt-0">
            <Typography className="font-normal text-gray-600">
                {content}
            </Typography>
            </CardBody>
            <CardFooter className="pt-0 px-4">
                <Link href={signupLink}>
                    <Button>Signup</Button>
                </Link>
            </CardFooter>
        </Card>
    </>
  )
}

export default SignupCard;