import type React from "react"
import ClientLayout from "./clientLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rolezinho - Encontre os melhores eventos",
  description: "Descubra os melhores eventos e festas perto de você com o Rolezinho",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rolezinho.vercel.app"),
  openGraph: {
    title: "Rolezinho - Encontre os melhores eventos",
    description: "Descubra os melhores eventos e festas perto de você com o Rolezinho",
    url: "https://rolezinho.vercel.app",
    siteName: "Rolezinho",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rolezinho - Encontre os melhores eventos",
    description: "Descubra os melhores eventos e festas perto de você com o Rolezinho",
  },
  verification: {
    google: "google-site-verification-code", // Substitua pelo seu código real quando disponível
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'