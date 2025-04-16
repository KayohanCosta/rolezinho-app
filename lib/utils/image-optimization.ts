// Função para gerar URLs de imagem otimizadas
export function getOptimizedImageUrl(imageUrl: string, width?: number, quality?: number): string {
  // Se a URL já for do Next.js Image Optimization, retorne-a
  if (imageUrl.includes("/_next/image")) {
    return imageUrl
  }

  // Se for uma URL externa, use o componente Image do Next.js para otimizá-la
  if (imageUrl.startsWith("http")) {
    // A URL será processada pelo componente Image do Next.js
    return imageUrl
  }

  // Para imagens locais, adicione parâmetros de otimização se necessário
  if (imageUrl.startsWith("/")) {
    const params = new URLSearchParams()
    if (width) params.append("w", width.toString())
    if (quality) params.append("q", quality.toString())

    const queryString = params.toString()
    return queryString ? `${imageUrl}?${queryString}` : imageUrl
  }

  // Fallback para a URL original
  return imageUrl
}
