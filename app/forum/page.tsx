"use client"

import type React from "react"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ForumPost } from "@/components/forum-post"
import { MapPin, ImageIcon, Video, X, Filter, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    content: "Gente, o bar da mocinha aqui na praia de iracema ta pegando fogo! 🔥 Melhor festa da cidade hoje!",
    timestamp: new Date(2025, 1, 6, 20, 0),
    location: {
      name: "Bar da Mocinha, Praia de Iracema",
      coordinates: {
        lat: -3.7219,
        lng: -38.5124,
      },
    },
  },
  {
    id: 2,
    user: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
    },
    content: "Onde tá rolando hoje? Alguém tem alguma dica de um lugar legal? 🎉",
    timestamp: new Date(2025, 1, 6, 19, 30),
  },
  {
    id: 3,
    user: {
      name: "Pedro Costa",
      avatar: "/placeholder.svg?height=40&width=40&text=PC",
    },
    content:
      "Festival incrível acontecendo no Aterrinho da Praia de Iracema! Tem food trucks, música ao vivo e muita gente bonita! 🎸🍔",
    timestamp: new Date(2025, 1, 6, 19, 0),
    location: {
      name: "Aterrinho da Praia de Iracema",
      coordinates: {
        lat: -3.7205,
        lng: -38.5147,
      },
    },
  },
]

export default function Forum() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [newPost, setNewPost] = useState("")
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [location, setLocation] = useState("")
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: "Você",
          avatar: "/placeholder.svg?height=40&width=40&text=VC",
        },
        content: newPost.trim(),
        timestamp: new Date(),
        ...(location
          ? {
              location: {
                name: location,
                coordinates: {
                  lat: -3.7319,
                  lng: -38.5267,
                },
              },
            }
          : {}),
        ...(mediaPreview
          ? {
              media: {
                type: mediaType as "image" | "video",
                url: mediaPreview,
              },
            }
          : {}),
      }
      setPosts([post, ...posts])
      setNewPost("")
      setLocation("")
      setIsAddingLocation(false)
      setMediaPreview(null)
      setMediaType(null)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setMediaPreview(url)
      setMediaType(type)
    }
  }

  const clearMedia = () => {
    setMediaPreview(null)
    setMediaType(null)
  }

  return (
    <PageContainer>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
          <div className="max-w-2xl mx-auto p-4 lg:p-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Fórum</h1>

              <div className="hidden lg:flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Tendências
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <Textarea
                    placeholder="O que está acontecendo? Compartilhe eventos e festas com a galera!"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />

                  {mediaPreview && (
                    <div className="relative">
                      {mediaType === "image" ? (
                        <div className="relative h-48 w-full">
                          <Image
                            src={mediaPreview || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <video src={mediaPreview} className="w-full rounded-lg" controls />
                      )}
                      <button
                        type="button"
                        onClick={clearMedia}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "image")}
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" variant="ghost" size="sm" className="cursor-pointer">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Foto
                        </Button>
                      </label>

                      <input
                        type="file"
                        accept="video/*"
                        id="video-upload"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "video")}
                      />
                      <label htmlFor="video-upload">
                        <Button type="button" variant="ghost" size="sm" className="cursor-pointer">
                          <Video className="h-4 w-4 mr-2" />
                          Vídeo
                        </Button>
                      </label>

                      {isAddingLocation ? (
                        <div className="flex items-center gap-2 flex-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Digite o nome do local"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 bg-transparent border-none text-sm focus:outline-none"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setIsAddingLocation(false)
                              setLocation("")
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingLocation(true)}>
                          <MapPin className="h-4 w-4 mr-2" />
                          Adicionar localização
                        </Button>
                      )}
                    </div>

                    <Button type="submit" disabled={!newPost.trim()} className="w-full sm:w-auto mt-2 sm:mt-0">
                      Publicar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="lg:hidden mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="flex-1">
                    Tendências
                  </TabsTrigger>
                  <TabsTrigger value="nearby" className="flex-1">
                    Próximos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <ForumPost key={post.id} {...post} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar direita (visível apenas em desktop) */}
        <div className="hidden lg:block space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Tendências</h3>
              </div>
              <div className="space-y-3">
                {["#FestivalDeVerão", "#BaladaTop", "#RolêNoFDS", "#MúsicaAoVivo"].map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{tag}</p>
                      <p className="text-xs text-gray-500">{100 - index * 15} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Eventos Próximos</h3>
              </div>
              <div className="space-y-3">
                {["Bar da Mocinha", "Aterrinho da Praia", "Arena Shows"].map((place, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">{place}</p>
                        <p className="text-xs text-gray-500">{3 - index} eventos hoje</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Buscar no Fórum</h3>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Input type="search" placeholder="Buscar posts..." className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
