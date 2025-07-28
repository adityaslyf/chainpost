"use client"

import { motion } from "framer-motion"
import { AnimatedGrid, AnimatedGridItem } from "@/components/ui/animated-grid"

const audienceData = [
  {
    emoji: "🚀",
    title: "Web3 Traders",
    description: "Access a new asset class with social sentiment-driven tokens and real utility.",
    gradient: "from-purple-500 to-blue-500"
  },
  {
    emoji: "📱",
    title: "Reddit Users", 
    description: "Monetize your favorite posts and earn from your community engagement.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    emoji: "💎",
    title: "Content Creators",
    description: "Get rewarded for creating viral content that resonates with communities.",
    gradient: "from-cyan-500 to-green-500"
  },
  {
    emoji: "🎯",
    title: "Social Traders",
    description: "Trade based on social trends and community sentiment in real-time.",
    gradient: "from-green-500 to-purple-500"
  }
]

export function AudienceSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-silkscreen)]">
            Built For Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're a crypto native or Reddit enthusiast, TokenReddit has something for you.
          </p>
        </motion.div>

        <AnimatedGrid cols={4} className="max-w-6xl mx-auto">
          {audienceData.map((audience, index) => (
            <AnimatedGridItem key={index}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-4xl group-hover:scale-110 transition-transform duration-300">
                  {audience.emoji}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{audience.title}</h3>
                <p className="text-gray-600 leading-relaxed">{audience.description}</p>
              </div>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  )
} 