"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, BarChart3 } from "lucide-react"

export function TradingPreview() {
  const [progress, setProgress] = useState(45)
  const [price, setPrice] = useState(0.23)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price changes
      setPrice(prev => {
        const change = (Math.random() - 0.5) * 0.02
        return Math.max(0.01, prev + change)
      })
      
      // Simulate bonding curve progress
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 0.5)
        return Math.min(100, newProgress)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">Token Bonding Curve</h3>
      </div>

      {/* Sample Token */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            R
          </div>
          <span className="text-sm font-medium text-gray-900">
            "Solana DeFi is heating up! 🔥"
          </span>
        </div>
        <div className="text-xs text-gray-500">r/solana • 2.3k upvotes</div>
      </div>

      {/* Price Display */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            ${price.toFixed(3)}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-green-500">+12.4%</span>
            <span className="text-gray-400">24h</span>
          </div>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isActive ? 'SELL' : 'BUY'}
        </button>
      </div>

      {/* Bonding Curve Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Bonding Curve Progress</span>
          <span className="text-xs font-medium text-gray-900">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          When bonding curve completes, liquidity goes to Raydium
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-500 mb-1">Market Cap</div>
          <div className="font-semibold text-gray-900">$23.4K</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-500 mb-1">24h Volume</div>
          <div className="font-semibold text-gray-900">$8.9K</div>
        </div>
      </div>
    </div>
  )
} 