// Este é um service worker básico para PWA
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim())
})

// Estratégia de cache para arquivos estáticos
const CACHE_NAME = "rolezinho-static-v1"
const STATIC_ASSETS = ["/", "/favicon.ico", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"]

self.addEventListener("fetch", (event) => {
  // Estratégia de cache: network first, fallback para cache
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html")
      }),
    )
    return
  }

  // Para arquivos estáticos: cache first, fallback para network
  if (STATIC_ASSETS.some((asset) => event.request.url.includes(asset))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            const cachePut = caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone())
            })
            return fetchResponse
          })
        )
      }),
    )
    return
  }

  // Para outras requisições: network only
  event.respondWith(fetch(event.request))
})
