import React from "react";
import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/features-section";
import ServicesSection from "./_components/discover-more-section";

export default async function Home() {
  return (
    <div className="mt-10 space-y-10">
      <HeroSection />
      {/* <SecondHeroSection /> */}
      {/* <TestHeroSection /> */}
      <FeaturesSection />
      <ServicesSection />
    </div>
  );
}
