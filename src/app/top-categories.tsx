"use client";

import React from "react";
import CategoryCard from "@/components/category-card";

import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  FaHatCowboy,
  FaGlassWhiskey,
  FaLeaf,
  FaAppleAlt,
} from "react-icons/fa";

const CATEGORIES = [
  {
    img: "/assets/image7.jpg",
    icon: FaAppleAlt,
    title: "Seasonal Fruits",
    desc: "Indulge in nature's candy with our selection of seasonal fruits. Enjoy everything from summer berries to autumn apples, each picked at the peak of ripeness.",
  },
  {
    img: "/assets/image8.jpg",
    icon: FaHatCowboy,
    title: "Grass-Fed Meats",
    desc: "Experience the difference with our range of grass-fed, free-range meats. From succulent beef to tender chicken, our ethical farming practices ensure quality and flavor.",
  },
  {
    img: "/assets/image9.jpg",
    icon: FaGlassWhiskey,
    title: "Artisanal Dairy",
    desc: "Savor the rich, pure flavors of our artisanal dairy products. Our milk, cheese, and yogurts are produced using traditional methods, ensuring a fresh, creamy taste.",
  },
  {
    img: "/assets/image10.jpg",
    icon: FaLeaf,
    title: "Organic Vegetabless",
    desc: "Dive into the world of greens with our assortment of organic leafy vegetables, root veggies, and herbs, all cultivated without synthetic pesticides or GMOs.",
  },
];

export function TopCategories() {
  return (
    <section className="container mx-auto px-8 pb-20 pt-20 lg:pt-0">
      <div className="mb-20 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Top Categories
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Explore our diverse range of categories and embark on a journey of healthy eating habits.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          color="gray"
          className="relative grid h-full w-full place-items-center overflow-hidden text-center"
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <CardBody className="relative w-full">
            <Typography color="white" className="text-xs font-bold opacity-50">
              Fresh Picks Sale
            </Typography>
            <Typography variant="h4" className="mt-9" color="white">
              Harvest Bounty
            </Typography>
            <Typography
              color="white"
              className="mt-4 mb-14 font-normal opacity-50"
            >
              Discover the freshest farm-to-table experience with our handpicked selection of produce. From organic vegetables to seasonal fruits, our farm&apos;s bounty is your source for nutritious and delicious meals.
            </Typography>
            <Button size="sm" color="white">
              Shop Now
            </Button>
          </CardBody>
        </Card>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopCategories;
