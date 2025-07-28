"use client"

import { motion } from "framer-motion"
import { Link, Coins, BarChart3 } from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

export function HowItWorksSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, powerful, and designed for everyone. Get started in three easy steps.
          </p>
        </motion.div>

        <BentoGrid className="max-w-6xl mx-auto">
          <BentoGridItem
            title="01. Connect Reddit Post"
            description="Paste any Reddit post URL or use our API to automatically tokenize trending content from your favorite subreddits."
            header={
              <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-blue-600 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
            }
            className="md:col-span-1 p-6"
            index={0}
          />
          <BentoGridItem
            title="02. Mint Coin on Solana"
            description="Our smart contracts instantly create a unique token tied to the post, with transparent supply and trading mechanics."
            header={
              <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-green-600 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coins className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
            }
            className="md:col-span-1 p-6"
            index={1}
          />
          <BentoGridItem
            title="03. Trade & Earn Rewards"
            description="Buy, sell, and trade post tokens. Early supporters and original authors earn rewards based on post performance."
            header={
              <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-purple-600 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
            }
            className="md:col-span-1 p-6"
            index={2}
          />
        </BentoGrid>
      </div>
    </section>
  )
} 