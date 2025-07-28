"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaitlistInputProps {
  variant?: "hero" | "cta"
  className?: string
}

export function WaitlistInput({ variant = "hero", className }: WaitlistInputProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    
    // Reset form
    setEmail("")
    alert("Thanks for joining our waitlist!")
  }

  const inputStyles = variant === "hero" 
    ? "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    : "bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm"

  const buttonStyles = variant === "hero"
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-white text-blue-600 hover:bg-gray-100"

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 p-2 rounded-2xl sm:rounded-full border bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            "flex-1 px-4 py-3 sm:py-3 rounded-xl sm:rounded-full border-0 outline-none text-sm sm:text-base font-medium transition-colors min-h-[44px]",
            inputStyles
          )}
          required
        />
        <Button
          type="submit"
          disabled={isLoading || !email}
          className={cn(
            "rounded-xl sm:rounded-full px-6 py-3 font-semibold transition-all duration-200 group whitespace-nowrap min-h-[44px]",
            buttonStyles
          )}
        >
          <span className="hidden sm:inline">{isLoading ? "Joining..." : "Join Waitlist"}</span>
          <span className="sm:hidden">{isLoading ? "Joining..." : "Join"}</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  )
} 