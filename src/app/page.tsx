"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ParentFaqSection } from "@/components/ParentFaqSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/parent");
  };

  return (
    <main className="relative">
      <Header showLogin />
      <HeroSection onGetStarted={handleGetStarted} />
      <ParentFaqSection />
      <Footer />
    </main>
  );
}
