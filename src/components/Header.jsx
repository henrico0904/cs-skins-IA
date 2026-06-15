export default function Header({ onToggleFavorites, currentView, favoriteCount }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cs-bg/90 backdrop-blur-xl border-b border-cs-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cs-blue to-cs-gold flex items-center justify-center flex-shrink-0 shadow-lg shadow-cs-blue/50">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-black text-xl tracking-tight text-cs-text uppercase">
            CS<span className="text-cs-blue">:</span>GO
            <span className="text-cs-gold ml-1">SKINS</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-body font-medium text-cs-muted">
          <button 
            onClick={() => onToggleFavorites()} 
            className={`transition-colors duration-200 ${currentView === 'all' ? 'hover:text-cs-blue' : 'text-cs-gold font-bold'}`}
          >
            {currentView === 'all' ? 'Explorar' : 'Ver Todas'}
          </button>
          <a href="#grid" className="hover:text-cs-blue transition-colors duration-200">Coleção</a>
          <a href="#" className="hover:text-cs-blue transition-colors duration-200">Sobre</a>
        </nav>

        {/* CTA */}
        <button
          onClick={onToggleFavorites}
          className={`text-xs font-body font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
            currentView === 'favorites' 
            ? 'bg-cs-blue text-white shadow-lg shadow-cs-blue/50' 
            : 'bg-gradient-to-r from-cs-blue to-cs-gold text-white hover:shadow-lg hover:shadow-cs-blue/50'
          }`}
        >
          {currentView === 'favorites' ? 'Ver Todas' : `⭐ Favoritos (${favoriteCount})`}
        </button>
      </div>
    </header>
  )
}
