"use client"

import type React from "react"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  sender: string
  avatar: string
  lastMessage: string
  timestamp: string
}

interface Request {
  id: number
  sender: string
  avatar: string
  message: string
  timestamp: string
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "Alice",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
    lastMessage: "Oi! Você vai ao evento de sábado?",
    timestamp: "2025-02-06T14:30:00Z",
  },
  {
    id: 2,
    sender: "Bob",
    avatar: "/placeholder.svg?height=40&width=40&text=B",
    lastMessage: "Acabei de comprar ingressos para o festival!",
    timestamp: "2025-02-06T15:45:00Z",
  },
  {
    id: 3,
    sender: "Charlie",
    avatar: "/placeholder.svg?height=40&width=40&text=C",
    lastMessage: "Vamos combinar de ir juntos ao show?",
    timestamp: "2025-02-06T16:20:00Z",
  },
]

const MOCK_REQUESTS: Request[] = [
  {
    id: 1,
    sender: "David",
    avatar: "/placeholder.svg?height=40&width=40&text=D",
    message: "Oi! Posso te adicionar como amigo?",
    timestamp: "2025-02-06T13:10:00Z",
  },
  {
    id: 2,
    sender: "Eva",
    avatar: "/placeholder.svg?height=40&width=40&text=E",
    message: "Olá! Gostaria de te convidar para um evento.",
    timestamp: "2025-02-06T17:05:00Z",
  },
]

export default function CaixaDeMensagens() {
  const [showRequests, setShowRequests] = useState(false)
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS)
  const [activeChat, setActiveChat] = useState<Message | null>(null)
  const [chatMessages, setChatMessages] = useState<{ [key: string]: string[] }>({})
  const [newMessage, setNewMessage] = useState("")

  const handleToggleRequests = () => {
    setShowRequests(!showRequests)
    setActiveChat(null)
  }

  const handleAcceptRequest = (request: Request) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: request.sender,
      avatar: request.avatar,
      lastMessage: request.message,
      timestamp: request.timestamp,
    }
    setMessages([newMessage, ...messages])
    setRequests(requests.filter((r) => r.id !== request.id))
    setChatMessages({
      ...chatMessages,
      [request.sender]: [request.message],
    })
  }

  const handleRejectRequest = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id))
  }

  const handleOpenChat = (message: Message) => {
    setActiveChat(message)
    setShowRequests(false)
    if (!chatMessages[message.sender]) {
      setChatMessages({
        ...chatMessages,
        [message.sender]: [message.lastMessage],
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeChat && newMessage.trim()) {
      const updatedMessages = [...(chatMessages[activeChat.sender] || []), newMessage.trim()]
      setChatMessages({
        ...chatMessages,
        [activeChat.sender]: updatedMessages,
      })
      setMessages(
        messages.map((msg) =>
          msg.id === activeChat.id
            ? { ...msg, lastMessage: newMessage.trim(), timestamp: new Date().toISOString() }
            : msg,
        ),
      )
      setNewMessage("")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold">Caixa de Mensagens</h1>
          {!activeChat && (
            <Button onClick={handleToggleRequests} className="w-full sm:w-auto">
              {showRequests ? "Voltar às Mensagens" : "Solicitações"}
            </Button>
          )}
        </div>

        {activeChat ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="outline" onClick={() => setActiveChat(null)} className="w-full sm:w-auto">
                Voltar
              </Button>
              <Avatar>
                <AvatarImage src={activeChat.avatar} alt={activeChat.sender} />
                <AvatarFallback>{activeChat.sender[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{activeChat.sender}</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-400px)] border rounded-md p-4">
              {chatMessages[activeChat.sender]?.map((msg, index) => (
                <div key={index} className={`mb-4 ${index === 0 ? "text-left" : "text-right"}`}>
                  <div
                    className={`inline-block p-2 rounded-lg ${index === 0 ? "bg-gray-200" : "bg-blue-500 text-white"}`}
                  >
                    {msg}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow"
              />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            {showRequests ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.avatar} alt={request.sender} />
                          <AvatarFallback>{request.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{request.sender}</p>
                          <p className="text-sm text-gray-600">{request.message}</p>
                          <p className="text-xs text-gray-400">{formatDate(request.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleAcceptRequest(request)} size="sm" variant="outline">
                          Aceitar
                        </Button>
                        <Button onClick={() => handleRejectRequest(request.id)} size="sm" variant="outline">
                          Recusar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleOpenChat(message)}
                  >
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Avatar>
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold">{message.sender}</p>
                          <p className="text-xs text-gray-400">{formatDate(message.timestamp)}</p>
                        </div>
                        <p className="text-sm text-gray-600">{message.lastMessage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </PageContainer>
  )
}
