"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import FeatureCard from "@/components/feature-card";
import {
  TruckIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const FEATURES = [
  {
    icon: BanknotesIcon,
    title: "Your Farming Ally",
    description:
      "We support sustainable agriculture by providing resources, community-supported agriculture shares, and special discounts for local businesses.",
  },
  {
    icon: ClockIcon,
    title: "Around-the-Clock Freshness",
    description:
      "Our customer service team is passionate about produce. We’re here for you 24/7 to help with orders, delivery tracking, and answering your farm-to-table questions.",
  },
  {
    icon: TruckIcon,
    title: "Effortless Ordering, Swift to Your Doorstep",
    description:
      "From our fields to your fork, we ensure a seamless shopping experience with quick delivery options because we believe nothing should come between you and fresh food.",
  },
];

export function GetYourFoodFromUs() {
  return (
    <section className="px-8">
      <div className="container mx-auto mb-16 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
        Savor the Freshness!
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-5/12"
        >
          Embark on a journey of taste with our farm&apos;s harvest.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

export default GetYourFoodFromUs;
