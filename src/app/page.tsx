import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import BestSellers from "@/components/home/BestSellers";
import TrustStrip from "@/components/home/TrustStrip";
import About from "@/components/home/About";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";
import Location from "@/components/home/Location";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (err) {
    console.error("home products", err);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BestSellers products={products} />
        <TrustStrip />
        <About />
        <HowItWorks />
        <Testimonials />
        <InstagramFeed />
        <Faq />
        <Newsletter />
        <Location />
      </main>
      <Footer />
    </>
  );
}
