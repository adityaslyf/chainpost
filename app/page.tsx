"use client"

import { 
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  CtaSection,
  FooterSection,
  HeaderSection
} from "@/components/sections"

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeaderSection />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}
