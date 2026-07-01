
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BuySection from "@/components/BuySection";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BuySection />
      <SubscribeSection />
      <Footer />
    </main>
  );
}

