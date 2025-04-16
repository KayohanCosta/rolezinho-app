import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Building, Globe } from "lucide-react"

const CONTACT_INFO = {
  phone: "+55 (11) 1234-5678",
  email: "contato@rolezim.com",
  cnpj: "12.345.678/0001-90",
  website: "https://www.rolezim.com",
}

export default function Contatos() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contatos</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>{CONTACT_INFO.email}</span>
            </div>
            <div className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              <span>CNPJ: {CONTACT_INFO.cnpj}</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              <a
                href={CONTACT_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {CONTACT_INFO.website}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
