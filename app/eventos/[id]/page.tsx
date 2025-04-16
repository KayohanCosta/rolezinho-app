import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const MOCK_EVENT = {
  id: "1",
  title: "Festival de Verão 2024",
  imageUrl: "/placeholder.svg?height=400&width=800",
  date: "15 de Janeiro, 2024",
  time: "14:00 - 23:00",
  location: "Praia de Copacabana, Rio de Janeiro",
  description: "O maior festival de música do verão, com artistas nacionais e internacionais.",
  price: 150.0,
}

export default function EventDetails({ params }: { params: { id: string } }) {
  // Em uma aplicação real, você buscaria os detalhes do evento com base no ID
  const event = MOCK_EVENT

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="relative h-64 w-full">
          <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </div>
        <div className="px-4 space-y-4">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <p className="text-gray-700">{event.description}</p>
          <div className="text-2xl font-bold">R$ {event.price.toFixed(2)}</div>
          <Link href={`/checkout/${event.id}`}>
            <Button className="w-full">Comprar Ingresso</Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}
