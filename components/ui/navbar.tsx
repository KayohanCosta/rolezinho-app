"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Calendar, PlusCircle, MessageSquare, User, Video, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const NAV_ITEMS = [
  { label: "Início", href: "/", icon: Home },
  {
    label: "Eventos",
    icon: Calendar,
    dropdown: [
      { label: "Ver Eventos", href: "/eventos" },
      { label: "Cadastrar Evento", href: "/divulgue" },
    ],
  },
  {
    label: "Criar",
    icon: PlusCircle,
    dropdown: [
      { label: "Stories", href: "/stories", icon: Video },
      { label: "Forum", href: "/forum", icon: FileText },
    ],
  },
  { label: "Chat", href: "/caixa-de-mensagens", icon: MessageSquare },
  { label: "Perfil", href: "/perfil", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around items-center p-3 max-w-xl mx-auto">
        {NAV_ITEMS.map((item) => {
          if (item.dropdown) {
            return (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex flex-col items-center gap-1 text-gray-500 transition-colors",
                      item.label === "Criar" && "bg-pink-500 p-3 rounded-full -mt-8 text-white hover:bg-pink-600",
                    )}
                  >
                    <item.icon
                      size={item.label === "Criar" ? 24 : 20}
                      className={item.label === "Criar" ? "text-white" : ""}
                    />
                    <span className="text-xs">{item.label}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.href} asChild>
                      <Link href={dropdownItem.href} className="flex items-center gap-2 w-full">
                        {dropdownItem.icon && <dropdownItem.icon size={16} />}
                        {dropdownItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-gray-500 transition-colors",
                pathname === item.href && "text-pink-500 font-semibold",
              )}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
