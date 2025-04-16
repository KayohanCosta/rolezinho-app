import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface EmpresaParceiraCardProps {
  id: string
  name: string
  logoUrl: string
  description: string
}

export function EmpresaParceiraCard({ id, name, logoUrl, description }: EmpresaParceiraCardProps) {
  return (
    <Link href={`/empresas/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex flex-col items-center h-full">
          <div className="relative w-16 h-16 mb-3">
            <Image src={logoUrl || "/placeholder.svg"} alt={name} fill className="object-contain" />
          </div>
          <h3 className="font-semibold text-sm mb-2 text-center">{name}</h3>
          <p className="text-xs text-gray-500 text-center line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
