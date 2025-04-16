import { Home, Calendar, Map, User, Search } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around items-center p-3">
        <Link href="/" className="flex flex-col items-center">
          <Home size={20} />
          <span className="text-xs">Início</span>
        </Link>
        <Link href="/eventos" className="flex flex-col items-center">
          <Calendar size={20} />
          <span className="text-xs">Eventos</span>
        </Link>
        <Link href="/mapa" className="flex flex-col items-center">
          <Map size={20} />
          <span className="text-xs">Mapa</span>
        </Link>
        <Link href="/buscar" className="flex flex-col items-center">
          <Search size={20} />
          <span className="text-xs">Buscar</span>
        </Link>
        <Link href="/perfil" className="flex flex-col items-center">
          <User size={20} />
          <span className="text-xs">Perfil</span>
        </Link>
      </div>
    </nav>
  )
}
