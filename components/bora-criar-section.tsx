"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Video } from "lucide-react"

export function BoraCriarSection() {
  const [discussion, setDiscussion] = useState("")
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null)

  const handlePhotoClick = () => {
    setMediaType("photo")
    // Here you would typically open a file picker for photos
    console.log("Open photo picker")
  }

  const handleVideoClick = () => {
    setMediaType("video")
    // Here you would typically open a file picker for videos
    console.log("Open video picker")
  }

  const handleSubmit = () => {
    console.log("Submitted:", { discussion, mediaType })
    // Here you would handle the submission of the post
    setDiscussion("")
    setMediaType(null)
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-4">
        <Textarea
          placeholder="E aí, galera! Qual é a boa de hoje? Conta pra gente! 🎉🔥"
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        <div className="flex justify-between items-end">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePhotoClick}
              className={mediaType === "photo" ? "bg-primary text-primary-foreground" : ""}
            >
              <Camera className="w-4 h-4 mr-2" />
              Foto
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVideoClick}
              className={mediaType === "video" ? "bg-primary text-primary-foreground" : ""}
            >
              <Video className="w-4 h-4 mr-2" />
              Vídeo
            </Button>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            disabled={!discussion && !mediaType}
          >
            Bora criar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
