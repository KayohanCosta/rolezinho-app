import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rolezinho - Encontre os melhores eventos",
    short_name: "Rolezinho",
    description: "Descubra os melhores eventos e festas perto de você com o Rolezinho",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
