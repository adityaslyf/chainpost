"use client"

import { SocialDock } from "@/components/ui/social-dock"

export function FooterSection() {
  return (
    <footer className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-gray-900 font-silkscreen">
            TokenReddit
          </div>
          
          {/* Social Dock */}
          <SocialDock />
          
          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm text-center px-4 font-nunito">
            © 2024 TokenReddit. Built on Solana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 