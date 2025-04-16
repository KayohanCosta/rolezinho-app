"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Calendar,
  PlusCircle,
  MessageSquare,
  Video,
  FileText,
  Map,
  Ticket,
  Settings,
  LogOut,
  Info,
  Users,
  Phone,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const NAV_ITEMS = [
  { label: "Início", href: "/", icon: Home },
  { label: "Eventos", href: "/eventos", icon: Calendar },
  { label: "Mapa", href: "/mapa", icon: Map },
  { label: "Meus Ingressos", href: "/meus-ingressos", icon: Ticket },
  { label: "Stories", href: "/stories", icon: Video },
  { label: "Fórum", href: "/forum", icon: FileText },
  { label: "Chat", href: "/caixa-de-mensagens", icon: MessageSquare },
]

const SECONDARY_ITEMS = [
  { label: "Divulgue seu Rolezim", href: "/divulgue", icon: PlusCircle },
  { label: "Parcerias", href: "/parcerias", icon: Users },
  { label: "Sobre nós", href: "/sobre", icon: Info },
  { label: "Contatos", href: "/contatos", icon: Phone },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false)

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 z-30">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-semibold text-primary">Rolezim</span>
        </Link>
      </div>

      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <Collapsible open={isSecondaryOpen} onOpenChange={setIsSecondaryOpen} className="mt-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500">
            <span>Mais opções</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform ${isSecondaryOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {SECONDARY_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      <div className="p-4 border-t">
        <div className="space-y-2">
          <Link
            href="/configuracoes"
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
              pathname === "/configuracoes"
                ? "bg-primary/10 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Configurações</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
