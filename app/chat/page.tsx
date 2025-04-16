"use client"

import type React from "react"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { PersonalChat } from "@/components/personal-chat"
import { Briefcase, GraduationCap, MapPin, Heart, Wine, Cigarette, Dumbbell } from "lucide-react"
import Image from "next/image"

const MOCK_MESSAGES = [
  {
    id: 1,
    user: {
      name: "Alice Silva",
      age: 28,
      avatar: "/placeholder.svg?height=400&width=300&text=Alice",
      bio: "Apaixonada por música, viagens e boa comida. Sempre em busca de novas aventuras!",
      location: "São Paulo, SP",
      job: "Designer Gráfica",
      company: "Creative Studios",
      school: "Universidade de São Paulo",
      interests: ["Música", "Viagens", "Fotografia", "Culinária", "Yoga"],
      photos: [
        "/placeholder.svg?height=400&width=300&text=Foto+1",
        "/placeholder.svg?height=400&width=300&text=Foto+2",
        "/placeholder.svg?height=400&width=300&text=Foto+3",
      ],
      sexualOrientation: "Heterossexual",
      relationshipStatus: "Solteira",
      distance: 5,
      education: "Graduação em Design",
      lifestyle: "Urbano",
      physicalActivity: "3-4 vezes por semana",
      smoking: "Não fumante",
      drinking: "Socialmente",
    },
    message: "Olá! Alguém animado para o festival de verão?",
  },
  {
    id: 2,
    user: {
      name: "Bob Santos",
      age: 32,
      avatar: "/placeholder.svg?height=400&width=300&text=Bob",
      bio: "Fotógrafo profissional e amante de eventos culturais. Sempre com a câmera em mãos!",
      location: "Rio de Janeiro, RJ",
      job: "Fotógrafo",
      company: "Freelancer",
      school: "Universidade Federal do Rio de Janeiro",
      interests: ["Fotografia", "Música ao vivo", "Arte", "Tecnologia", "Esportes"],
      photos: [
        "/placeholder.svg?height=400&width=300&text=Foto+1",
        "/placeholder.svg?height=400&width=300&text=Foto+2",
        "/placeholder.svg?height=400&width=300&text=Foto+3",
      ],
      sexualOrientation: "Bissexual",
      relationshipStatus: "Em um relacionamento aberto",
      distance: 8,
      education: "Mestrado em Artes Visuais",
      lifestyle: "Alternativo",
      physicalActivity: "1-2 vezes por semana",
      smoking: "Fumante ocasional",
      drinking: "Socialmente",
    },
    message: "Com certeza! Já comprei meus ingressos.",
  },
  {
    id: 3,
    user: {
      name: "Charlie Oliveira",
      age: 25,
      avatar: "/placeholder.svg?height=400&width=300&text=Charlie",
      bio: "DJ nas horas vagas e estudante de engenharia de som. Viciado em café e música eletrônica!",
      location: "Belo Horizonte, MG",
      job: "Estudante",
      company: "Universidade Federal de Minas Gerais",
      school: "Universidade Federal de Minas Gerais",
      interests: ["Música eletrônica", "Produção musical", "Tecnologia", "Café", "Festivais"],
      photos: [
        "/placeholder.svg?height=400&width=300&text=Foto+1",
        "/placeholder.svg?height=400&width=300&text=Foto+2",
        "/placeholder.svg?height=400&width=300&text=Foto+3",
      ],
      sexualOrientation: "Gay",
      relationshipStatus: "Solteiro",
      distance: 3,
      education: "Graduando em Engenharia de Som",
      lifestyle: "Noturno",
      physicalActivity: "Raramente",
      smoking: "Não fumante",
      drinking: "Frequentemente",
    },
    message: "Qual é a line-up principal?",
  },
]

export default function Chat() {
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof MOCK_MESSAGES)[0]["user"] | null>(null)
  const [personalChatUser, setPersonalChatUser] = useState<(typeof MOCK_MESSAGES)[0]["user"] | null>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: {
            name: "Você",
            age: 30,
            avatar: "/placeholder.svg?height=400&width=300&text=Você",
            bio: "Seu perfil",
            location: "Sua localização",
            job: "Sua profissão",
            company: "Sua empresa",
            school: "Sua escola",
            interests: ["Seus interesses"],
            photos: ["/placeholder.svg?height=400&width=300&text=Sua+Foto"],
            sexualOrientation: "Sua orientação",
            relationshipStatus: "Seu status de relacionamento",
            distance: 0,
            education: "Sua educação",
            lifestyle: "Seu estilo de vida",
            physicalActivity: "Sua atividade física",
            smoking: "Seus hábitos de fumo",
            drinking: "Seus hábitos de bebida",
          },
          message: newMessage.trim(),
        },
      ])
      setNewMessage("")
    }
  }

  const handleOpenPersonalChat = () => {
    if (selectedUser) {
      setPersonalChatUser(selectedUser)
    }
  }

  const handleClosePersonalChat = () => {
    setPersonalChatUser(null)
  }

  const handleUserClick = (user: (typeof MOCK_MESSAGES)[0]["user"]) => {
    setSelectedUser(user)
  }

  return (
    <PageContainer className="pb-16">
      <div className="flex flex-col min-h-[calc(100vh-80px)] relative z-20">
        {personalChatUser ? (
          <PersonalChat user={personalChatUser} onClose={handleClosePersonalChat} />
        ) : (
          <>
            <div className="flex-grow flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chat Geral</h1>
              </div>
              <ScrollArea className="flex-grow h-[calc(100vh-240px)]">
                <div className="p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => handleUserClick(msg.user)}
                    >
                      <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{msg.user.name}</p>
                        <p className="text-sm text-gray-600">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    className="flex-grow"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit">Enviar</Button>
                </form>
              </div>
            </div>
            {selectedUser && (
              <Card className="mt-4 relative z-20">
                <CardContent className="p-0">
                  <div className="relative h-96">
                    <Image
                      src={selectedUser.avatar || "/placeholder.svg"}
                      alt={selectedUser.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
                      <h1 className="text-3xl font-bold">
                        {selectedUser.name}, {selectedUser.age}
                      </h1>
                      <div className="flex items-center mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{selectedUser.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <section>
                      <h2 className="text-xl font-semibold mb-2">Sobre mim</h2>
                      <p>{selectedUser.bio}</p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Trabalho e Educação</h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>
                            {selectedUser.job} em {selectedUser.company}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          <span>{selectedUser.school}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          <span>{selectedUser.education}</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Relacionamento</h2>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-2" />
                        <span>
                          {selectedUser.sexualOrientation}, {selectedUser.relationshipStatus}
                        </span>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Localização</h2>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>A {selectedUser.distance} km de distância</span>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Estilo de Vida</h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Dumbbell className="w-4 h-4 mr-2" />
                          <span>Atividade física: {selectedUser.physicalActivity}</span>
                        </div>
                        <div className="flex items-center">
                          <Cigarette className="w-4 h-4 mr-2" />
                          <span>{selectedUser.smoking}</span>
                        </div>
                        <div className="flex items-center">
                          <Wine className="w-4 h-4 mr-2" />
                          <span>Bebe: {selectedUser.drinking}</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Interesses</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.interests.map((interest, index) => (
                          <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-2">Fotos</h2>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedUser.photos.map((photo, index) => (
                          <div key={index} className="relative aspect-square">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Foto ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </PageContainer>
  )
}
