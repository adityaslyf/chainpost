'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function HeaderSection() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-900 font-silkscreen">
              TokenReddit
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-nunito"
            >
              How it Works
            </a>
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-nunito"
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-nunito"
            >
              Community
            </a>
          </nav>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
} 