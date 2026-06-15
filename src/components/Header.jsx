export default function Header() {
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
          <a href="#" className="hover:text-cs-blue transition-colors duration-200">Catálogo</a>
          <a href="#" className="hover:text-cs-blue transition-colors duration-200">Explorar</a>
          <a href="#" className="hover:text-cs-blue transition-colors duration-200">Sobre</a>
        </nav>

        {/* Badge */}
        <div className="hidden xs:flex items-center gap-2 px-3 py-1 rounded-full bg-cs-blue/10 border border-cs-blue/20">
          <span className="w-2 h-2 rounded-full bg-cs-blue animate-pulse" />
          <span className="text-[10px] font-bold text-cs-blue uppercase tracking-widest">Live Inventory</span>
        </div>
      </div>
    </header>
  )
}
