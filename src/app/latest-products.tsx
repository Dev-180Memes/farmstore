"use client";

import React from "react";
import {
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import ProductCard from "@/components/product-card";
import Link from "next/link";

const PRODUCTS = [
  {
    img: `/assets/image1.jpg`,
    category: "Fruits",
    title: "Test Fruit",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
  {
    img: `/assets/image2.jpg`,
    category: "Vegetables",
    title: "Test Vegetable",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
  {
    img: `/assets/image3.jpg`,
    category: "Poultry",
    title: "Test Poultry",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
  {
    img: `/assets/image4.jpg`,
    category: "Meat",
    title: "Test Meat",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
  {
    img: `/assets/image5.jpg`,
    category: "Dairy",
    title: "Test Dairy",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
  {
    img: `/assets/image6.jpg`,
    category: "Eggs",
    title: "Test Eggs",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: 99,
  },
];



export function LatestProducts() {
  const [activeTab, setActiveTab] = React.useState<string>("All");
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const categories = PRODUCTS.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    setCategories(["All", ...uniqueCategories]);
  }, []);

  return (
    <section className="px-8 pt-20 pb-10">
      <div className="container mx-auto mb-20 text-center">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-3 font-bold uppercase"
        >
          Savor the Season Sale
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-2">
          Farm Fresh Essential
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12"
        >
          Stock your pantry with the finest nature has to offer. Our selection ranges from heirloom vegetables to orchard-fresh fruits and organic dairy products. Perfect for food enthusiasts and home chefs looking to add freshness to their culinary creations.
        </Typography>
        <div className="mt-20 flex items-center justify-center">
          <Tabs value={activeTab} className="w-full lg:w-8/12">
            <TabsHeader
              className="h-12 bg-transparent"
              indicatorProps={{
                className: "!bg-gray-900 rounded-lg",
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  value={category}
                  className={`!font-medium capitalize transition-all duration-300
                    ${activeTab === category ? "text-white" : "capitalize"}
                  `}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {/* {PRODUCTS.map((props, key) => (
          <ProductCard key={key} {...props} />
        ))} */}
        {/* If activeTab is "All" show all products else show only products with the category of activeTab */}
        {PRODUCTS.filter((product) => activeTab === "All" || product.category === activeTab).map((props, key) => (
          <ProductCard key={key} {...props} />
        ))}
      </div>
      <div className="grid place-items-center">
        <Link href={"/products"}>
          <Button className="mt-32" variant="outlined">
            Show more
          </Button>
        </Link>
      </div>
    </section>
  );
}


export default LatestProducts;