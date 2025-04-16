import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MeusIngressos() {
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Meus Ingressos</h1>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Festival de Verão 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Data: 15 de Janeiro, 2024</p>
              <p>Status: Ativo</p>
            </CardContent>
          </Card>
          {/* Adicione mais cards de ingressos conforme necessário */}
        </div>
      </div>
    </PageContainer>
  )
}
