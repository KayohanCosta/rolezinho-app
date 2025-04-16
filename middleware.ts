import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Adiciona headers de segurança
  const response = NextResponse.next()

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Adiciona CSP para produção
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https:;",
    )
  }

  return response
}

// Configurar quais rotas devem passar pelo middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (favicon)
     * - public (arquivos públicos)
     * - api/health (endpoint de health check)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/health).*)",
  ],
}
