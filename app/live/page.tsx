import { PageContainer } from "@/components/ui/page-container"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MOCK_CHAT_MESSAGES = [
  { id: 1, user: "Alice", message: "A apresentação está incrível!", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, user: "Bob", message: "Concordo! O som está perfeito.", avatar: "/placeholder.svg?height=32&width=32" },
  {
    id: 3,
    user: "Charlie",
    message: "Alguém sabe qual é a próxima música?",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function Live() {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Transmissão ao Vivo</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 flex space-x-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Qualidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Câmera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Principal</SelectItem>
                  <SelectItem value="stage-left">Palco Esquerdo</SelectItem>
                  <SelectItem value="stage-right">Palco Direito</SelectItem>
                  <SelectItem value="audience">Público</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ScrollArea className="h-[400px] p-4">
              {MOCK_CHAT_MESSAGES.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={msg.avatar} alt={msg.user} />
                    <AvatarFallback>{msg.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{msg.user}</p>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="border-t p-4">
              <form className="flex space-x-2">
                <Input className="flex-grow" placeholder="Digite sua mensagem..." />
                <Button type="submit">Enviar</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
