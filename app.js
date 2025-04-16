import * as lucide from "lucide-react"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  const menuToggle = document.getElementById("menu-toggle")
  const mobileNav = document.getElementById("mobile-nav")
  const mainContent = document.getElementById("main-content")

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active")
    })
  }

  // Função para carregar conteúdo
  function loadContent(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        mainContent.innerHTML = html
        // Inicializa os ícones Lucide após carregar o conteúdo
        lucide.createIcons()
        // Inicializa funcionalidades específicas da página
        initPageFunctionality()
      })
      .catch((error) => {
        console.error("Erro ao carregar o conteúdo:", error)
        mainContent.innerHTML = "<p>Erro ao carregar o conteúdo. Por favor, tente novamente.</p>"
      })
  }

  // Carregar conteúdo inicial
  loadContent("home.html")

  // Adicionar event listeners para links de navegação
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href").startsWith("/")) {
        e.preventDefault()
        const url = link.getAttribute("href").slice(1) + ".html"
        loadContent(url)
        // Fechar o menu móvel se estiver aberto
        mobileNav.classList.remove("active")
      }
    })
  })

  // Inicializar ícones Lucide
  lucide.createIcons()

  // Função para inicializar funcionalidades específicas da página
  function initPageFunctionality() {
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "")

    switch (currentPage) {
      case "chat":
        initChatPage()
        break
      case "live":
        initLivePage()
        break
      case "mapa":
        initMapaPage()
        break
      case "perfil":
        initPerfilPage()
        break
      case "eventos":
        initEventosPage()
        break
    }
  }

  // Funções específicas para cada página
  function initChatPage() {
    console.log("Chat page initialized")
    const chatForm = document.getElementById("chat-form")
    const chatInput = document.getElementById("chat-input")
    const chatMessages = document.getElementById("chat-messages")

    if (chatForm && chatInput && chatMessages) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const message = chatInput.value.trim()
        if (message) {
          addChatMessage("sent", message)
          chatInput.value = ""
          // Simular uma resposta após 1 segundo
          setTimeout(() => {
            addChatMessage("received", "Obrigado pela sua mensagem! Um de nossos atendentes responderá em breve.")
          }, 1000)
        }
      })

      function addChatMessage(type, message) {
        const messageElement = document.createElement("div")
        messageElement.classList.add("chat-message", type, "p-3", "rounded-lg", "mb-2")
        messageElement.textContent = message
        chatMessages.appendChild(messageElement)
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  }

  function initLivePage() {
    console.log("Live page initialized")
    // Add any specific functionality for the Live page
    const videoPlayer = document.getElementById("video-player")
    const qualitySelect = document.getElementById("quality-select")
    const cameraSelect = document.getElementById("camera-select")

    if (qualitySelect) {
      qualitySelect.addEventListener("change", () => {
        // Aqui você pode adicionar a lógica para mudar a qualidade do vídeo
        console.log("Qualidade alterada para:", qualitySelect.value)
      })
    }

    if (cameraSelect) {
      cameraSelect.addEventListener("change", () => {
        // Aqui você pode adicionar a lógica para mudar a câmera
        console.log("Câmera alterada para:", cameraSelect.value)
      })
    }
  }

  function initMapaPage() {
    console.log("Mapa page initialized")
    // Aqui você pode adicionar a lógica para inicializar o mapa
    console.log("Mapa inicializado")
  }

  function initPerfilPage() {
    console.log("Perfil page initialized")
    const profileForm = document.getElementById("profile-form")

    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // Simular atualização do perfil
        alert("Perfil atualizado com sucesso!")
      })
    }
  }

  function initEventosPage() {
    console.log("Eventos page initialized")
    // Add any specific functionality for the Eventos page
  }
})
