"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Zap, Shield, Trophy, Target } from "lucide-react"
import { FeatureCard, FeatureGrid } from "@/components/ui/feature-grid"

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-[family-name:var(--font-silkscreen)] px-4 sm:px-0">
            Why redcircle?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            The first platform to bridge social content with DeFi trading mechanisms.
          </p>
        </motion.div>

        <FeatureGrid>
          <FeatureCard
            icon={TrendingUp}
            title="Monetize Viral Content"
            description="Turn your engagement into earnings. Early supporters of viral posts get rewarded as popularity grows."
            gradient="from-blue-600 to-blue-600"
            index={0}
          />
          <FeatureCard
            icon={Shield}
            title="Solana-Powered Security"
            description="Built on Solana's fast, secure blockchain. All transactions are transparent and verifiable."
            gradient="from-green-600 to-green-600"
            index={1}
          />
          <FeatureCard
            icon={Users}
            title="Community-Driven"
            description="Democratic curation with leaderboards and reputation systems. The community decides what's valuable."
            gradient="from-purple-600 to-purple-600"
            index={2}
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Fast Trading"
            description="Near-instant transactions with minimal fees. Trade post tokens as quickly as you scroll Reddit."
            gradient="from-orange-600 to-orange-600"
            index={3}
          />
          <FeatureCard
            icon={Trophy}
            title="Reward Original Creators"
            description="Original post authors earn royalties from their content's tokenization and trading activity."
            gradient="from-indigo-600 to-indigo-600"
            index={4}
          />
          <FeatureCard
            icon={Target}
            title="Smart Curation"
            description="AI-powered content scoring and optional automated tokenization of trending posts."
            gradient="from-teal-600 to-teal-600"
            index={5}
          />
        </FeatureGrid>
      </div>
    </section>
  )
} 