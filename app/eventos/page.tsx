import { PageContainer } from "@/components/ui/page-container"
import { EventCard } from "@/components/event-card"
import { FestaCard } from "@/components/festa-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Festival de Verão 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "15 de Janeiro, 2024",
  },
  {
    id: "2",
    title: "Show de Rock",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "20 de Janeiro, 2024",
  },
  {
    id: "3",
    title: "Festa na Praia",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "25 de Janeiro, 2024",
  },
  {
    id: "4",
    title: "Concerto de Música Clássica",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "5 de Fevereiro, 2024",
  },
]

const MOCK_FESTAS = [
  {
    id: "1",
    title: "Noite de Samba no Clube Carioca",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "10 de Fevereiro, 2024",
    location: "Clube Samba, Rio de Janeiro",
  },
  {
    id: "2",
    title: "Festa Eletrônica: Neon Nights",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "17 de Fevereiro, 2024",
    location: "Arena Eletrônica, São Paulo",
  },
  {
    id: "3",
    title: "Carnaval Fora de Época: Folia de Verão",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "24 de Fevereiro, 2024",
    location: "Avenida Principal, Salvador",
  },
  {
    id: "4",
    title: "Festa à Fantasia: Mundo Mágico",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "2 de Março, 2024",
    location: "Castelo dos Sonhos, Gramado",
  },
  {
    id: "5",
    title: "Festa Junina Antecipada",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "9 de Março, 2024",
    location: "Parque das Festas, Campina Grande",
  },
  {
    id: "6",
    title: "Baile de Máscaras: Noite Veneziana",
    imageUrl: "/placeholder.svg?height=200&width=400",
    date: "16 de Março, 2024",
    location: "Palácio das Artes, Ouro Preto",
  },
]

export default function Eventos() {
  return (
    <PageContainer>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 lg:pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0">Eventos</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Buscar eventos..." className="pl-10 w-full sm:w-64" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="featured">Em Destaque</TabsTrigger>
            <TabsTrigger value="parties">Festas</TabsTrigger>
            <TabsTrigger value="concerts">Shows</TabsTrigger>
            <TabsTrigger value="cultural">Culturais</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Eventos em Destaque</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {MOCK_EVENTS.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Festas em Destaque</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {MOCK_FESTAS.map((festa) => (
                  <FestaCard key={festa.id} {...festa} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MOCK_EVENTS.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parties">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {MOCK_FESTAS.map((festa) => (
                <FestaCard key={festa.id} {...festa} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concerts">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MOCK_EVENTS.slice(0, 2).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cultural">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MOCK_EVENTS.slice(2, 4).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
