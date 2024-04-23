"use client";
import React from "react";

import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
const FAQS = [
  {
    title: "How does the platform ensure the quality of products from different farmers?",
    desc: "We meticulously vet all farmers and their practices before they join our platform, ensuring they meet our high standards for sustainable and ethical farming. Additionally, we encourage our community of buyers to rate and review their purchases to maintain a transparent quality assurance process.",
  },
  {
    title: "What types of products can I find on the website?",
    desc: "You can find a wide range of fresh farm products, including fruits, vegetables, meats, dairy, and eggs, as well as artisanal goods like jams, honey, and baked items. All products are sourced directly from local farmers and producers.",
  },
  {
    title: "How does the subscription service work for regular deliveries?",
    desc: "Our subscription service lets you choose from various farm boxes curated by individual farmers or customize your own. You can set up recurring deliveries weekly, bi-weekly, or monthly, and change your subscription preferences at any time.",
  },
  {
    title: "As a shopper, can I choose which farm my produce comes from?",
    desc: "Yes, you can. Our platform allows you to explore and select products from specific farms. You can shop by farm to get to know the farmers, their practices, and choose produce based on your preferences for local and sustainable agriculture.",
  },
  {
    title: "What happens if produce I ordered is no longer available?",
    desc: "In the rare event that an item becomes unavailable, you'll be notified immediately, and we'll suggest similar alternatives. You can choose a replacement, or we can adjust your bill accordingly. Our priority is to ensure you receive fresh, high-quality products with every order.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section className="px-8 py-40">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 w-full max-w-2xl !text-gray-500"
          >
            Find answers to common questions about our platform, products, and services.
          </Typography>
        </div>
        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader className="text-left text-gray-900">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Faq;
