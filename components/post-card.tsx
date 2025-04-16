"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface PostCardProps {
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  media?: {
    type: "image" | "video"
    url: string
  }
}

export function PostCard({ user, content, timestamp, media }: PostCardProps) {
  const [likes, setLikes] = useState(0)
  const [comment, setComment] = useState("")

  const handleLike = () => setLikes(likes + 1)

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the comment to your backend
    console.log("New comment:", comment)
    setComment("")
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content}</p>
        {media && (
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            {media.type === "image" ? (
              <img src={media.url || "/placeholder.svg"} alt="Post content" className="object-cover w-full h-full" />
            ) : (
              <video src={media.url} controls className="object-cover w-full h-full" />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 w-full">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <Heart className="w-5 h-5 mr-1" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-5 h-5 mr-1" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        <form onSubmit={handleComment} className="flex w-full gap-2">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Post</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
