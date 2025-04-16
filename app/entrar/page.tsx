import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Entrar() {
  return (
    <PageContainer>
      <div className="max-w-md mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Senha" required />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
