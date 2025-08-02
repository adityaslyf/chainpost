"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number | string
  numSquares?: number
  className?: string
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: GridPatternProps) {
  const id = React.useId()
  
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/20 stroke-gray-400/20",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {Array.from({ length: numSquares }, (_, i) => (
          <rect
            strokeWidth="0"
            key={`${id}-${i}`}
            width={width - 1}
            height={height - 1}
            x={`${i % Math.floor(2000 / width) * width + 1}`}
            y={`${Math.floor(i / Math.floor(2000 / width)) * height + 1}`}
            fill={`url(#${id})`}
            fillOpacity={maxOpacity}
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${duration}s`,
            }}
          />
        ))}
      </svg>
    </svg>
  )
}

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
}

export function DotPattern({
  width = 16,
  height = 16,
  x = -1,
  y = -1,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = React.useId()
  
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/20",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}

export function AnimatedGridPattern({
  numSquares = 30,
  maxOpacity = 0.1,
  duration = 3,
  repeatDelay = 0.5,
  className,
  ...props
}: GridPatternProps) {
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="animated-grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#animated-grid)" />
        {Array.from({ length: numSquares }, (_, i) => (
          <rect
            key={i}
            width="50"
            height="50"
            x={getRandomNumber(0, 100) + "%"}
            y={getRandomNumber(0, 100) + "%"}
            fill="currentColor"
            opacity="0"
            className="animate-pulse"
            style={{
              animationDelay: `${i * repeatDelay}s`,
              animationDuration: `${duration}s`,
              opacity: Math.random() * maxOpacity,
            }}
          />
        ))}
   </svg>
    </div>
  )
} 