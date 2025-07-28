"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import React, { useRef } from "react"

export interface DockProps {
  className?: string
  children: React.ReactNode
  direction?: "top" | "middle" | "bottom"
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, direction = "bottom", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "mx-auto flex h-[58px] w-max gap-2 rounded-2xl border border-gray-200 bg-white backdrop-blur-sm p-2 shadow-lg hover:shadow-xl transition-shadow",
          "dark:border-neutral-800 dark:bg-neutral-900/80",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)
Dock.displayName = "Dock"

export interface DockIconProps {
  size?: number
  className?: string
  children?: React.ReactNode
}

const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  ({ size = 40, className, children, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity)

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      mouseX.set(x)
    }

    const handleMouseLeave = () => {
      mouseX.set(Infinity)
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-lg",
          "bg-gray-50 transition-all duration-300 hover:bg-gray-100 border border-gray-200/50",
          "dark:bg-neutral-600/40 dark:hover:bg-neutral-600/60",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: size,
          height: size,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)
DockIcon.displayName = "DockIcon"

export { Dock, DockIcon } 