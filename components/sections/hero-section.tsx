"use client"

import { motion } from "framer-motion"
import { GridPattern } from "@/components/ui/grid-pattern"
import { WaitlistInput } from "@/components/ui/waitlist-input"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern 
        width={60}
        height={60}
        className="absolute inset-0 h-full w-full stroke-gray-200/40 fill-gray-100/20"
      />
      
      {/* Secondary Grid Pattern */}
      <GridPattern 
        width={30}
        height={30}
        x={15}
        y={15}
        className="absolute inset-0 h-full w-full stroke-gray-300/20 fill-gray-200/10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-6">
              🚀 Powered by Solana Blockchain
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight font-[family-name:var(--font-silkscreen)]"
          >
            Turn Reddit Posts Into
            <span className="block text-blue-600">Tradeable Coins</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            TokenReddit revolutionizes social media by letting you tokenize Reddit posts on Solana. 
            Trade viral content, earn rewards, and be part of the future of social finance.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <WaitlistInput variant="hero" className="w-full sm:w-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 