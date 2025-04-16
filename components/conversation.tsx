"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send } from "lucide-react"

interface Message {
  sender: string
  message: string
  timestamp: string
}

interface ConversationProps {
  sender: string
  messages: Message[]
  onClose: () => void
  onSendMessage: (message: string) => void
}

export function Conversation({ sender, messages, onClose, onSendMessage }: ConversationProps) {
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Fixed unnecessary dependency

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
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
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex items-center space-x-4 mb-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Avatar>
          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${sender[0]}`} alt={sender} />
          <AvatarFallback>{sender[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{sender}</h2>
      </div>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-md" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === "Você" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "Você" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <p className="mb-1">{msg.message}</p>
              <p className="text-xs opacity-70">{formatDate(msg.timestamp)}</p>
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
        <Button type="submit">
          <Send className="h-4 w-4 mr-2" />
          Enviar
        </Button>
      </form>
    </div>
  )
}
