"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

interface EventCardProps {
  id: string
  imageUrl: string
  title: string
  date: string
}

export function EventCard({ id, imageUrl, title, date }: EventCardProps) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/eventos/${id}`)} className="block cursor-pointer">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative h-48">
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
