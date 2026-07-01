
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BuySection from "@/components/BuySection";
import SubscribeSection from "@/components/SubscribeSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />
      <BuySection />
      <SubscribeSection />
    </main>
  );
}

