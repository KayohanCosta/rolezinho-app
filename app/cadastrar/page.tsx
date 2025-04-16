import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Cadastrar() {
  return (
    <PageContainer>
      <div className="max-w-md mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="text" placeholder="Nome completo" required />
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Senha" required />
              <Input type="password" placeholder="Confirmar senha" required />
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
