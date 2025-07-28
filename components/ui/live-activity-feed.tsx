"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Users, DollarSign } from "lucide-react"

interface ActivityItem {
  id: string
  type: "tokenize" | "trade" | "milestone"
  post: string
  subreddit: string
  price?: string
  volume?: string
  time: string
  trending?: boolean
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "tokenize",
    post: "Solana just hit $300! 🚀",
    subreddit: "r/solana",
    price: "$0.15",
    time: "2s ago"
  },
  {
    id: "2", 
    type: "trade",
    post: "Best meme coin on Solana?",
    subreddit: "r/crypto",
    price: "$2.34",
    volume: "$1.2K",
    time: "5s ago"
  },
  {
    id: "3",
    type: "milestone",
    post: "How to HODL through the bear market",
    subreddit: "r/cryptocurrency",
    price: "$5.67",
    time: "8s ago",
    trending: true
  },
  {
    id: "4",
    type: "tokenize",
    post: "DeFi summer is back?",
    subreddit: "r/defi",
    price: "$0.08",
    time: "12s ago"
  },
  {
    id: "5",
    type: "trade",
    post: "Reddit IPO thoughts",
    subreddit: "r/investing",
    price: "$1.89",
    volume: "$890",
    time: "15s ago"
  }
]

export function LiveActivityFeed() {
  const [activities, setActivities] = useState(mockActivities.slice(0, 3))
  const [stats] = useState({
    postsTokenized: 1247,
    volume24h: "$89.2K", 
    activeTraders: 342
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)]
      const activityWithNewId = {
        ...newActivity,
        id: `${Date.now()}`,
        time: "now"
      }
      
      setActivities(prev => [activityWithNewId, ...prev.slice(0, 2)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tokenize":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      case "trade":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case "milestone":
        return <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "tokenize":
        return "border-blue-200 bg-blue-50"
      case "trade":
        return "border-green-200 bg-green-50"
      case "milestone":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-blue-600 mr-1" />
          </div>
          <div className="text-lg font-bold text-gray-900">{stats.postsTokenized}</div>
          <div className="text-xs text-gray-500">Posts Tokenized</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
          </div>
          <div className="text-lg font-bold text-gray-900">{stats.volume24h}</div>
          <div className="text-xs text-gray-500">24h Volume</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
          </div>
          <div className="text-lg font-bold text-gray-900">{stats.activeTraders}</div>
          <div className="text-xs text-gray-500">Active Traders</div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Live Activity</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </div>
        
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-blue-600">{activity.subreddit}</span>
                    {activity.trending && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 truncate">{activity.post}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      {activity.price && (
                        <span className="text-green-600 font-medium">{activity.price}</span>
                      )}
                      {activity.volume && (
                        <span>Vol: {activity.volume}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 