"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageContainer } from "@/components/ui/page-container"
import { PostCard } from "@/components/post-card"
import { BoraCriarSection } from "@/components/bora-criar-section"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Ticket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "Alice Silva",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
    },
    content: "Gente, o festival de verão desse ano vai ser incrível! Quem mais vai?",
    timestamp: "2 horas atrás",
    media: {
      type: "image" as const,
      url: "/placeholder.svg?height=500&width=500&text=Festival+de+Verão",
    },
  },
  {
    id: 2,
    user: {
      name: "Bob Santos",
      avatar: "/placeholder.svg?height=40&width=40&text=BS",
    },
    content: "Olha só o vídeo da festa de ontem! Foi demais!",
    timestamp: "5 horas atrás",
    media: {
      type: "video" as const,
      url: "https://example.com/video-placeholder.mp4",
    },
  },
  {
    id: 3,
    user: {
      name: "Carol Oliveira",
      avatar: "/placeholder.svg?height=40&width=40&text=CO",
    },
    content: "Alguém sabe qual é o line-up do show de rock no próximo fim de semana?",
    timestamp: "1 dia atrás",
  },
]

const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Festival de Verão 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "15 de Janeiro, 2024",
    location: "Praia de Copacabana, Rio de Janeiro",
  },
  {
    id: "2",
    title: "Show de Rock",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "20 de Janeiro, 2024",
    location: "Arena Show, São Paulo",
  },
  {
    id: "3",
    title: "Festa na Praia",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "25 de Janeiro, 2024",
    location: "Praia do Futuro, Fortaleza",
  },
]

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <PageContainer>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 max-w-screen-2xl mx-auto">
        {/* Feed principal (coluna esquerda em desktop) */}
        <div className="lg:col-span-7 space-y-6 lg:col-start-1">
          <BoraCriarSection />

          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Sidebar direita (visível apenas em desktop) */}
        <div className="hidden lg:block lg:col-span-5 space-y-6">
          {/* Próximos eventos */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Próximos Eventos</h3>
                <Link href="/eventos">
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {UPCOMING_EVENTS.map((event) => (
                  <Link href={`/eventos/${event.id}`} key={event.id} className="block">
                    <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={event.imageUrl || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{event.date}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links rápidos */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4">Acesso Rápido</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/eventos">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Eventos
                  </Button>
                </Link>
                <Link href="/meus-ingressos">
                  <Button variant="outline" className="w-full justify-start">
                    <Ticket className="w-4 h-4 mr-2" />
                    Ingressos
                  </Button>
                </Link>
                <Link href="/parcerias">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Parcerias
                  </Button>
                </Link>
                <Link href="/mapa">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Mapa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sugestões de amigos */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4">Sugestões para Seguir</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {String.fromCharCode(64 + id)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">Usuário {id}</p>
                        <p className="text-xs text-gray-500">@usuario{id}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
