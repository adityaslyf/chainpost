"use client"

import { motion } from "framer-motion"
import { Bitcoin, Star, Globe, Shield, Rocket } from "lucide-react"
import { WaitlistInput } from "@/components/ui/waitlist-input"

export function CtaSection() {
  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-white" />
              <Bitcoin className="h-6 w-6 text-white" />
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-silkscreen)]">
            Ready to Transform
            <span className="block">Social Trading?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Join thousands of early adopters who are already earning from social content. 
            Be part of the future of Web3 social finance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <WaitlistInput variant="cta" className="w-full sm:w-auto" />
           
          </div>
          
          <div className="flex justify-center items-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Coming Soon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Built on Solana</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 