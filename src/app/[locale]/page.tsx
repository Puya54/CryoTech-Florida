"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import HeroSection from "@/components/sections/HeroSection";
import ResidentialSection from "@/components/sections/ResidentialSection";
import CommercialSection from "@/components/sections/CommercialSection";
import AutomotiveSection from "@/components/sections/AutomotiveSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  const scrollToQuote = () => {
    const el = document.getElementById("residential");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="mobile-bottom-spacing" style={{ flex: 1 }}>
        <HeroSection />
        <ResidentialSection />
        <CommercialSection />
        <AutomotiveSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <MobileBottomBar onQuoteClick={scrollToQuote} />
    </div>
  );
}
