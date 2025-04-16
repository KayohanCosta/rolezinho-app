"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { PageContainer } from "@/components/ui/page-container"
import { X, Heart, MessageCircle, Send, Music, Smile, ImageIcon, Mic } from "lucide-react"

// Dados mockados para os stories
const MOCK_STORIES = [
  {
    id: 1,
    username: "marina_silva",
    avatar: "https://i.pravatar.cc/150?img=1",
    stories: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "2h",
      },
    ],
  },
  {
    id: 2,
    username: "carlos_oliveira",
    avatar: "https://i.pravatar.cc/150?img=2",
    stories: [
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "5h",
      },
    ],
  },
  {
    id: 3,
    username: "julia_santos",
    avatar: "https://i.pravatar.cc/150?img=3",
    stories: [
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "8h",
      },
    ],
  },
  {
    id: 4,
    username: "pedro_costa",
    avatar: "https://i.pravatar.cc/150?img=4",
    stories: [],
  },
  {
    id: 5,
    username: "ana_lima",
    avatar: "https://i.pravatar.cc/150?img=5",
    stories: [
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "12h",
      },
    ],
  },
  {
    id: 6,
    username: "lucas_martins",
    avatar: "https://i.pravatar.cc/150?img=6",
    stories: [
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "23h",
      },
    ],
  },
  {
    id: 7,
    username: "beatriz_almeida",
    avatar: "https://i.pravatar.cc/150?img=7",
    stories: [
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        timestamp: "1d",
      },
    ],
  },
  {
    id: 8,
    username: "rafael_souza",
    avatar: "https://i.pravatar.cc/150?img=8",
    stories: [],
  },
]

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState("stories")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showStoryView, setShowStoryView] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [currentStoryProgress, setCurrentStoryProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const storyDuration = 5000 // 5 segundos por story

  // Função para abrir o visualizador de stories
  const openStoryView = (index: number) => {
    setCurrentStoryIndex(index)
    setShowStoryView(true)
    setCurrentStoryProgress(0)
    setIsPlaying(true)
  }

  // Função para fechar o visualizador de stories
  const closeStoryView = () => {
    setShowStoryView(false)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  // Função para navegar para o próximo story
  const nextStory = () => {
    if (currentStoryIndex < MOCK_STORIES.filter((s) => s.stories.length > 0).length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
      setCurrentStoryProgress(0)
    } else {
      closeStoryView()
    }
  }

  // Função para navegar para o story anterior
  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
      setCurrentStoryProgress(0)
    }
  }

  // Função para pausar/continuar o story
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Função para lidar com o upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  // Função para lidar com o drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  // Função para prevenir o comportamento padrão do drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Função para simular o upload do story
  const handlePublish = () => {
    if (selectedFile) {
      setIsUploading(true)
      // Simulando um upload
      setTimeout(() => {
        setIsUploading(false)
        setSelectedFile(null)
        setPreviewUrl(null)
        setActiveTab("stories")
        // Aqui você adicionaria o novo story ao array de stories
      }, 2000)
    }
  }

  // Efeito para gerenciar o progresso do story atual
  useEffect(() => {
    if (showStoryView && isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      progressIntervalRef.current = setInterval(() => {
        setCurrentStoryProgress((prev) => {
          if (prev >= 100) {
            nextStory()
            return 0
          }
          return prev + (100 / storyDuration) * 100
        })
      }, 100)
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [showStoryView, currentStoryIndex, isPlaying])

  // Filtrar apenas usuários com stories
  const usersWithStories = MOCK_STORIES.filter((user) => user.stories.length > 0)

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveTab("create")}
              role="button"
              tabIndex={0}
              aria-label="Criar seu story"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveTab("create")
                }
              }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <span className="text-2xl text-gray-400">+</span>
              </div>
              <span className="mt-1 text-xs text-center">Seu story</span>
            </div>

            {MOCK_STORIES.map(
              (story, index) =>
                story.stories.length > 0 && (
                  <div
                    key={story.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => openStoryView(index)}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px]">
                      <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                        <Image
                          src={story.avatar || "/placeholder.svg"}
                          alt={story.username}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="mt-1 text-xs text-center">{story.username}</span>
                  </div>
                ),
            )}
          </div>
        </div>

        <Tabs value={activeTab} className="mt-6">
          <TabsContent value="stories" className="mt-0">
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-4">
                {MOCK_STORIES.slice(0, 6).map((story, index) =>
                  story.stories.length > 0 ? (
                    <div key={`featured-${story.id}`} className="cursor-pointer" onClick={() => openStoryView(index)}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative aspect-[9/16] w-full">
                          <Image
                            src={
                              story.stories[0]?.url || `/placeholder.svg?height=400&width=600&text=Story+${story.id}`
                            }
                            alt={`Story de ${story.username}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                              <Image
                                src={story.avatar || "/placeholder.svg"}
                                alt={story.username}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium drop-shadow-md">{story.username}</p>
                              <p className="text-white text-xs drop-shadow-md">{story.stories[0]?.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-0">
            <div className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Criar um novo Story</h2>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {previewUrl ? (
                    <div className="relative max-h-[500px] overflow-hidden rounded-lg mx-auto">
                      {selectedFile?.type.startsWith("image/") ? (
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          width={400}
                          height={600}
                          className="mx-auto object-contain max-h-[500px] w-auto"
                        />
                      ) : selectedFile?.type.startsWith("video/") ? (
                        <video src={previewUrl} controls className="mx-auto max-h-[500px] w-auto" />
                      ) : null}
                      <button
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFile(null)
                          setPreviewUrl(null)
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon size={48} className="text-gray-400 mb-2" />
                        <p className="text-gray-600 mb-2">Arraste uma imagem ou vídeo aqui</p>
                        <p className="text-gray-400 text-sm mb-4">ou</p>
                        <Button onClick={() => fileInputRef.current?.click()}>Selecionar arquivo</Button>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>

                {previewUrl && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Adicionar detalhes</h3>
                    </div>
                    <div className="flex space-x-2 mb-4">
                      <Button variant="outline" size="sm">
                        <Music size={16} className="mr-1" /> Música
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile size={16} className="mr-1" /> Efeitos
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mic size={16} className="mr-1" /> Áudio
                      </Button>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handlePublish} disabled={isUploading}>
                        {isUploading ? "Publicando..." : "Publicar Story"}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Visualizador de Stories */}
        {showStoryView && usersWithStories[currentStoryIndex] && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Barra de progresso */}
            <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 z-10">
              <div className="h-1 bg-gray-600 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${currentStoryProgress}%` }}></div>
              </div>
            </div>

            {/* Cabeçalho do story */}
            <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={usersWithStories[currentStoryIndex].avatar || "/placeholder.svg"}
                    alt={usersWithStories[currentStoryIndex].username}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{usersWithStories[currentStoryIndex].username}</p>
                  <p className="text-white text-xs opacity-80">
                    {usersWithStories[currentStoryIndex].stories[0]?.timestamp}
                  </p>
                </div>
              </div>
              <button onClick={closeStoryView} className="text-white p-1">
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo do story */}
            <div className="flex-1 flex items-center justify-center" onClick={togglePlayPause}>
              <Image
                src={usersWithStories[currentStoryIndex].stories[0]?.url || ""}
                alt="Story"
                fill
                className="object-contain"
              />
            </div>

            {/* Navegação entre stories */}
            <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
              <div
                className="w-1/3 h-full pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  prevStory()
                }}
              ></div>
              <div
                className="w-1/3 h-full pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  nextStory()
                }}
              ></div>
            </div>

            {/* Ações do story */}
            <div className="absolute bottom-4 left-0 right-0 px-4 flex items-center space-x-4 z-10">
              <div className="flex-1 bg-white bg-opacity-10 rounded-full p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Enviar mensagem"
                  className="bg-transparent text-white flex-1 outline-none text-sm"
                />
                <Send size={20} className="text-white ml-2" />
              </div>
              <button className="text-white">
                <Heart size={24} />
              </button>
              <button
                className="text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowComments(!showComments)
                }}
              >
                <MessageCircle size={24} />
              </button>
            </div>

            {/* Painel de comentários */}
            {showComments && (
              <div
                className="absolute bottom-16 left-4 right-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 max-h-60 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-white text-sm font-medium mb-2">Comentários</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="https://i.pravatar.cc/150?img=10"
                        alt="Usuário"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">usuario_123</p>
                      <p className="text-white text-xs opacity-80">Que foto incrível! 🔥</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="https://i.pravatar.cc/150?img=11"
                        alt="Usuário"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">maria_silva</p>
                      <p className="text-white text-xs opacity-80">Adorei o lugar! Onde fica?</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  )
}
