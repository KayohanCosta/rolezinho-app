"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Users, Info, Phone, Settings, LogOut, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/AuthContext"

const menuItems = {
  merchandising: [
    { href: "/divulgue", label: "Divulgue seu Rolezim", icon: PlusCircle },
    { href: "/parcerias", label: "Parcerias", icon: Users },
  ],
  informacoes: [
    { href: "/sobre", label: "Sobre nós", icon: Info },
    { href: "/contatos", label: "Contatos", icon: Phone },
  ],
  conta: [{ href: "/configuracoes", label: "Configurações", icon: Settings }],
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <header className="bg-white shadow-sm lg:shadow-none sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="text-lg font-semibold text-primary">Rolezim</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full lg:hidden">
              <MenuIcon className="h-5 w-5 text-primary" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 bg-white rounded-r-3xl">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left text-primary">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-6">
                {user && (
                  <div className="px-4 py-2">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                )}
                {Object.entries(menuItems).map(([section, items]) => (
                  <div key={section}>
                    <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {section}
                    </h2>
                    <nav className="space-y-1">
                      {items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors rounded-full mx-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
                <div>
                  <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Conta</h2>
                  <nav className="space-y-1">
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-full mx-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sair
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
