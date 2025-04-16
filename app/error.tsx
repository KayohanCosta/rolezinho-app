"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcionalmente envie o erro para um serviço de monitoramento
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada.
      </p>
      <Button onClick={reset} className="px-6 py-2">
        Tentar novamente
      </Button>
    </div>
  )
}
