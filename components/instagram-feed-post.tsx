"use client"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface InstagramFeedPostProps {
  user: {
    username: string
    avatar: string
    verified?: boolean
  }
  media: {
    type: "image" | "video"
    url: string
  }
  caption?: string
  overlayText?: string
  likes: number
  commentCount: number
  timestamp: Date
}

export function InstagramFeedPost({
  user,
  media,
  caption,
  overlayText,
  likes,
  commentCount,
  timestamp,
}: InstagramFeedPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-none mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <span className="font-semibold text-sm">{user.username}</span>
            {user.verified && (
              <span className="ml-1 text-blue-500">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.5-4.5 1.4-1.4 3.1 3.1 6.2-6.2 1.4 1.4-7.6 7.6z" />
                </svg>
              </span>
            )}
          </div>
        </div>
        <button>
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Media */}
      <div className="relative">
        {media.type === "image" ? (
          <div className="aspect-square relative">
            <Image src={media.url || "/placeholder.svg"} alt="Post" fill className="object-cover" />
            {overlayText && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-4 py-2 font-medium text-lg max-w-[80%] text-shadow-lg">
                  {overlayText}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-square relative">
            <video src={media.url} className="w-full h-full object-cover" controls={false} loop muted autoPlay />
            {overlayText && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-4 py-2 font-medium text-lg max-w-[80%] text-shadow-lg">
                  {overlayText}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-black"}`} />
            </button>
            <button>
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>
          <button onClick={handleSave}>
            <Bookmark className={`h-6 w-6 ${isSaved ? "fill-black" : ""}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="text-sm font-semibold mb-1">{likeCount} curtidas</div>

        {/* Caption */}
        {caption && (
          <div className="text-sm mb-1">
            <span className="font-semibold mr-1">{user.username}</span>
            {caption}
          </div>
        )}

        {/* Comments */}
        <button className="text-gray-500 text-sm">Ver todos os {commentCount} comentários</button>

        {/* Timestamp */}
        <div className="text-gray-400 text-xs mt-1">
          {formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })}
        </div>
      </div>
    </div>
  )
}
