"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedGridProps {
  children: ReactNode
  className?: string
  cols?: number
  staggerDelay?: number
}

export function AnimatedGrid({ 
  children, 
  className, 
  cols = 3, 
  staggerDelay = 0.1 
}: AnimatedGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <motion.div
      className={cn("grid gap-6", gridCols[cols as keyof typeof gridCols], className)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedGridItem({ 
  children, 
  className,
  delay = 0 
}: { 
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 40, scale: 0.95 },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
      }}
    >
      {children}
    </motion.div>
  )
} 