import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
  avatarUrl: string
}

export function TestimonialCard({ name, role, testimonial, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 italic">"{testimonial}"</p>
      </CardContent>
    </Card>
  )
}
