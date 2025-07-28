"use client"

import { Tweet } from "react-tweet"

interface ClientTweetCardProps {
  id: string
}

export function ClientTweetCard({ id }: ClientTweetCardProps) {
  return (
    <div className="flex justify-center">
      <Tweet id={id} />
    </div>
  )
} 