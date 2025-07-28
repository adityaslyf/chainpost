"use client"

import { 
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  AudienceSection,
  CtaSection,
  FooterSection
} from "@/components/sections"

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AudienceSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}
