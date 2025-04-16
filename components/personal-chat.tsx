"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  sender: string
  content: string
}

interface PersonalChatProps {
  user: {
    name: string
    avatar: string
  }
  onClose: () => void
}

export function PersonalChat({ user, onClose }: PersonalChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "Você",
          content: newMessage.trim(),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{user.name}</h2>
        </div>
        <Button variant="ghost" onClick={onClose}>
          Fechar
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "Você" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  message.sender === "Você" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-grow"
          />
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  )
}
