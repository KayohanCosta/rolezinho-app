import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const TEAM_MEMBERS = [
  {
    name: "Kayohan Costa",
    role: "CEO Fundador",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Victor Scarpa",
    role: "CEO",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Ericson Marcilio",
    role: "CEO",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Italo Franklin",
    role: "UX/UI Designer",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Lucca Guerra",
    role: "Assessoria Jurídica",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Douglas Rafael",
    role: "Gestão Comercial",
    image: "/placeholder.svg?height=150&width=150",
  },
]

function TeamMemberCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-3 flex items-center space-x-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover rounded-full" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Sobre() {
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Sobre nós</h1>

        <section className="mb-12">
          <p className="mb-4">
            O Rolezim é uma plataforma inovadora que conecta pessoas a rolês incríveis. Nossa missão é tornar a
            descoberta e participação em eventos mais fácil e divertida para todos.
          </p>
          <p className="mb-4">
            Fundado em 2023, o Rolezim nasceu da paixão por criar experiências memoráveis e da vontade de simplificar a
            maneira como as pessoas encontram e participam de eventos.
          </p>
          <p>
            Nossa equipe é composta por profissionais dedicados e apaixonados, trabalhando juntos para oferecer a melhor
            experiência possível para nossos usuários e parceiros.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Nossa Equipe e Fundadores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
