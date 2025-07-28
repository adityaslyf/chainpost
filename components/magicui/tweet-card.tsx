import { Tweet } from "react-tweet"

interface TweetCardProps {
  id: string
}

export async function TweetCard({ id }: TweetCardProps) {
  return (
    <div className="flex justify-center">
      <Tweet id={id} />
    </div>
  )
} 