"use client"

import { motion } from "framer-motion"
import { ClientTweetCard } from "@/components/magicui/client-tweet-card"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Real tweets about Solana, crypto trading, and social finance
const relevantTweets = [
  "1668408059125702661", // Example from Magic UI docs
  "1735706065827238001", // Solana ecosystem tweet
  "1735312345678901234", // Social trading concept
  "1734567890123456789", // DeFi innovation tweet
]

export function TestimonialsSection() {
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
            What Crypto Twitter Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The community is talking about the future of social finance and tokenization.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {relevantTweets.map((tweetId) => (
            <motion.div key={tweetId} variants={fadeInUp}>
              <ClientTweetCard id={tweetId} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            Join the conversation and be part of the revolution
          </p>
          <div className="flex justify-center items-center space-x-6">
            <a 
              href="https://twitter.com/search?q=%23TokenReddit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              #TokenReddit
            </a>
            <a 
              href="https://twitter.com/search?q=%23SocialDeFi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              #SocialDeFi
            </a>
            <a 
              href="https://twitter.com/search?q=%23SolanaEcosystem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              #SolanaEcosystem
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 