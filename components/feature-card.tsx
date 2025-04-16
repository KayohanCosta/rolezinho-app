import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  Icon: LucideIcon
}

export function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Icon className="w-12 h-12 mb-4 text-purple-600" />
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
