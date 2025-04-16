import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Página não encontrada</h2>
      <p className="text-xl mb-8">Não foi possível encontrar a página solicitada.</p>
      <Link href="/" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
        Voltar para a página inicial do Rolezim
      </Link>
    </div>
  )
}
