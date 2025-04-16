import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Parcerias() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Parcerias</h1>
      <p className="mb-6">
        Estamos sempre em busca de novas parcerias para enriquecer a experiência dos nossos usuários. Se você tem um
        negócio relacionado a eventos, entre em contato conosco!
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome da empresa
          </label>
          <Input id="nome" placeholder="Digite o nome da sua empresa" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <Input id="email" type="email" placeholder="Digite seu e-mail" />
        </div>
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <Input id="telefone" placeholder="Digite seu telefone" />
        </div>
        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
            Mensagem
          </label>
          <Textarea id="mensagem" placeholder="Descreva sua proposta de parceria" />
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </PageContainer>
  )
}
