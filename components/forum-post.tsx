"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, ThumbsUp, Heart, PartyPopperIcon as Party, MessageCircle, Share2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

interface ForumPostProps {
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: Date
  location?: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  media?: {
    type: "image" | "video"
    url: string
  }
}

export function ForumPost({ user, content, timestamp, location, media }: ForumPostProps) {
  const [likes, setLikes] = useState(0)
  const [hearts, setHearts] = useState(0)
  const [party, setParty] = useState(0)

  const handleNavigateToLocation = () => {
    if (location) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`,
        "_blank",
      )
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="break-words">{content}</p>

        {media && (
          <div className="relative">
            {media.type === "image" ? (
              <div className="relative h-48 sm:h-64 w-full">
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt="Mídia do post"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <video src={media.url} className="w-full rounded-lg" controls />
            )}
          </div>
        )}

        {location && (
          <div className="flex flex-wrap items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{location.name}</span>
            <Button variant="outline" size="sm" onClick={handleNavigateToLocation} className="mt-2 sm:mt-0">
              Ir para lá
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
          <button
            onClick={() => setLikes((prev) => prev + 1)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />
            {likes > 0 && <span>{likes}</span>}
          </button>

          <button
            onClick={() => setHearts((prev) => prev + 1)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Heart className="h-4 w-4" />
            {hearts > 0 && <span>{hearts}</span>}
          </button>

          <button
            onClick={() => setParty((prev) => prev + 1)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-yellow-500 transition-colors"
          >
            <Party className="h-4 w-4" />
            {party > 0 && <span>{party}</span>}
          </button>

          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>Comentar</span>
          </button>

          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-500 transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
