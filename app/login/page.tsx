"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import type React from "react"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isLoggedIn } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta!",
          variant: "default",
        })
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "Email ou senha inválidos. Use teste@teste.com / 123456",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
              <TabsTrigger value="login" className="rounded-full">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-full">
                Pretendo curtir!
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary">Vamos curtir?</h1>
                <p className="text-gray-500 mt-2">Entre na sua conta para continuar</p>
                <p className="text-xs text-gray-400 mt-1">Use: teste@teste.com / 123456</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-500">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    className="rounded-full border-gray-200"
                    placeholder="Digite seu email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-500">
                    Senha
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    className="rounded-full border-gray-200"
                    placeholder="Digite sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm text-gray-500">
                      Lembrar de mim
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary">Cadastre-se já!</h1>
                <p className="text-gray-500 mt-2">Crie sua conta para começar a curtir</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-gray-500">
                    Nome
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    required
                    className="rounded-full border-gray-200"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-500">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    className="rounded-full border-gray-200"
                    placeholder="Digite seu email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-gray-500">
                    Senha
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    required
                    className="rounded-full border-gray-200"
                    placeholder="Digite sua senha"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Cadastrar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
