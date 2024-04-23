// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import TopCategories from "./top-categories";
import LatestProducts from "./latest-products";
import GetYourFoodFromUs from "./get-your-food-from-us";
import Faq from "./faq";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopCategories />
      <LatestProducts />
      <GetYourFoodFromUs />
      <Faq />
      <Footer />
    </>
  );
}
