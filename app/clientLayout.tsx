"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { Header } from "@/components/ui/header"
import { Navbar } from "@/components/ui/navbar"
import { DesktopSidebar } from "@/components/ui/desktop-sidebar"
import { DesktopHeader } from "@/components/ui/desktop-header"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login")
      } else if (isLoggedIn && pathname === "/login") {
        router.push("/")
      }
    }
  }, [isLoggedIn, isLoading, pathname, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  // Mostrar header e navbar apenas quando logado e não estiver visualizando stories
  const showMobileUI = isLoggedIn && pathname !== "/login" && !pathname.includes("/stories/view")
  // Mostrar sidebar e header desktop apenas quando logado
  const showDesktopUI = isLoggedIn && pathname !== "/login"
  // Verificar se está na página de stories, mas não visualizando um story específico
  const isStoriesPage = pathname === "/stories"

  return (
    <>
      {/* UI Mobile */}
      {showMobileUI && <Header />}

      {/* UI Desktop */}
      {showDesktopUI && <DesktopSidebar />}
      {showDesktopUI && <DesktopHeader />}

      {/* Conteúdo principal */}
      <main
        className={`container mx-auto px-4 pt-4 pb-8 mb-16 transition-all duration-300 ${
          showDesktopUI ? "lg:ml-64 lg:max-w-5xl lg:px-8 lg:mr-auto" : ""
        } ${showDesktopUI ? "lg:mt-4" : ""}`}
      >
        {children}
      </main>

      {/* Navbar mobile (visível apenas em telas pequenas) */}
      {showMobileUI && <Navbar />}
    </>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
