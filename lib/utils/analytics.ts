// Função para enviar eventos de analytics
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Verifica se está em produção e se o objeto window existe (client-side)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    try {
      // Implementação básica - você pode substituir por sua ferramenta de analytics preferida
      console.log(`[Analytics] ${eventName}`, properties)

      // Exemplo de integração com o Google Analytics (se estiver configurado)
      if (window.gtag) {
        window.gtag("event", eventName, properties)
      }

      // Exemplo de integração com o Vercel Analytics (se estiver configurado)
      if (window.va) {
        window.va("event", { name: eventName, ...properties })
      }
    } catch (error) {
      console.error("[Analytics Error]", error)
    }
  }
}

// Declaração de tipos para o TypeScript
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: any) => void
    va?: (command: string, params: any) => void
  }
}
