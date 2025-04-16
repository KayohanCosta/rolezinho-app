import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Configuracoes() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notificações por email</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Notificações push</Label>
              <Switch id="push-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-public">Perfil público</Label>
              <Switch id="profile-public" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-location">Mostrar localização</Label>
              <Switch id="show-location" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Salvar alterações</Button>
      </div>
    </PageContainer>
  )
}
