// Tipos para metadados SEO
export interface SeoProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{ url: string; alt?: string; width?: number; height?: number }>
    type?: string
  }
  twitter?: {
    card?: "summary" | "summary_large_image"
    title?: string
    description?: string
    image?: string
  }
}

// Função para gerar URLs canônicas
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rolezinho.vercel.app"
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
}

// Função para gerar metadados padrão
export function getDefaultMetadata(path: string): SeoProps {
  const title = "Rolezinho - Encontre os melhores eventos"
  const description = "Descubra os melhores eventos e festas perto de você com o Rolezinho"
  const canonical = getCanonicalUrl(path)

  return {
    title,
    description,
    canonical,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rolezinho.vercel.app"}/og-image.jpg`,
          alt: "Rolezinho App",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rolezinho.vercel.app"}/og-image.jpg`,
    },
  }
}
