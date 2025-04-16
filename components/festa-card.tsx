"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

interface FestaCardProps {
  id: string
  imageUrl: string
  title: string
  date: string
  location: string
}

export function FestaCard({ id, imageUrl, title, date, location }: FestaCardProps) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/eventos/${id}`)} className="block cursor-pointer">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative h-24 sm:h-32">
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="p-2 flex flex-col justify-between flex-grow">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
            <div className="text-xs text-gray-500">
              <div className="flex items-center mb-1">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
