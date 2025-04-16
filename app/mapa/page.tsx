import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Mapa() {
  return (
    <PageContainer>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Localização dos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Mapa será carregado aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
