"use client"

import { SocialDock } from "@/components/ui/social-dock"

export function FooterSection() {
  return (
    <footer className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            TokenReddit
          </div>
          
          {/* Social Dock */}
          <SocialDock />
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2024 TokenReddit
          </p>
        </div>
      </div>
    </footer>
  )
} 