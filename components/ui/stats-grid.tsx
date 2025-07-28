"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/animated-counter"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  icon?: LucideIcon
  gradient?: string
  index?: number
  className?: string
}

export function StatCard({
  value,
  label,
  suffix = "",
  prefix = "",
  icon: Icon,
  gradient = "from-purple-500 to-blue-500",
  index = 0,
  className
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300",
        "hover:border-purple-200 hover:shadow-purple-100/20",
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5",
        gradient
      )} />
      
      {/* Icon if provided */}
      {Icon && (
        <div className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r mb-4 mx-auto",
          gradient
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      
      {/* Stats */}
      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {prefix}
          <AnimatedCounter from={0} to={value} suffix={suffix} />
        </div>
        <div className="text-gray-600 font-medium">{label}</div>
      </div>
      
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl",
        `bg-gradient-to-br ${gradient}`
      )} />
    </motion.div>
  )
}

interface StatsGridProps {
  children: React.ReactNode
  className?: string
  cols?: number
}

export function StatsGrid({ children, className, cols = 3 }: StatsGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn(
      "grid gap-6 max-w-5xl mx-auto",
      gridCols[cols as keyof typeof gridCols],
      className
    )}>
      {children}
    </div>
  )
} 