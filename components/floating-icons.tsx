"use client"

import { motion } from "framer-motion"
import { Bitcoin, Coins, TrendingUp, Users, Zap, Shield } from "lucide-react"

const icons = [Bitcoin, Coins, TrendingUp, Users, Zap, Shield]

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-200/10"
          initial={{
            x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1200,
            y: typeof window !== "undefined" ? Math.random() * window.innerHeight : Math.random() * 800,
          }}
          animate={{
            x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1200,
            y: typeof window !== "undefined" ? Math.random() * window.innerHeight : Math.random() * 800,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Icon size={24 + Math.random() * 24} />
        </motion.div>
      ))}
    </div>
  )
} 