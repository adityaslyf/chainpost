"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient?: string
  className?: string
  index?: number
  size?: "default" | "large"
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = "from-purple-500 to-blue-500",
  className,
  index = 0,
  size = "default"
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500",
        "hover:border-purple-200 hover:shadow-purple-100/20",
        size === "large" && "md:col-span-2 lg:col-span-1",
        className
      )}
    >
      {/* Background gradient effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
        gradient
      )} />
      
      {/* Icon */}
      <div className={cn(
        "relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r mb-4 group-hover:scale-110 transition-transform duration-300",
        gradient
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      </div>
    </motion.div>
  )
}

interface FeatureGridProps {
  children: ReactNode
  className?: string
}

export function FeatureGrid({ children, className }: FeatureGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",
      className
    )}>
      {children}
    </div>
  )
} 