import { Button } from "@/components/ui/button";
import React from "react";
import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/features-section";
import ServicesSection from "./_components/discover-more-section";
import SecondHeroSection from "./_components/second-hero-section";
import TestHeroSection from "./_components/test-hero-section";

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      {/* <SecondHeroSection /> */}
      {/* <TestHeroSection /> */}
      <FeaturesSection />
      <ServicesSection />
    </div>
  );
}
