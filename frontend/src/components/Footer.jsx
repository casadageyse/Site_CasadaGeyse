import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#04040e] border-t border-white/[0.06] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Navegação */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
              <li><a href="/#casas" className="text-gray-400 hover:text-white transition-colors">Nossas Casas</a></li>
              <li><a href="/#como-funciona" className="text-gray-400 hover:text-white transition-colors">Como Funciona</a></li>
              <li><Link to="/classificados" className="text-gray-400 hover:text-white transition-colors">Classificados</Link></li>
            </ul>
          </div>

          {/* Regras — coluna central */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Informações</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/regras" className="text-gray-400 hover:text-white transition-colors">Regras da Casa</Link></li>
            </ul>
          </div>

          {/* Localização */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Localização</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="text-gray-500 text-xs">Penha — Armação e Centro</li>
              <li className="text-gray-500 text-xs">Barra Velha — Centro</li>
              <li className="text-gray-500 text-xs">Santa Catarina — Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Casa da Geyse. Todos os direitos reservados.</p>
          <p className="text-gray-600 text-xs">Somente para maiores de 18 anos.</p>
        </div>
      </div>
    </footer>
  )
}
