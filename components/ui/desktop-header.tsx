"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"

export function DesktopHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()

  return (
    <header className="hidden lg:flex items-center justify-between h-16 px-6 border-b bg-white fixed top-0 right-0 left-64 z-20">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar eventos, festas, pessoas..."
            className="pl-10 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>

        <Link href="/perfil">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={user?.avatar || "/placeholder.svg?height=32&width=32&text=U"}
              alt={user?.name || "Usuário"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
