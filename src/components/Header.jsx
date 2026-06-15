export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cs-bg/80 backdrop-blur-md border-b border-cs-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-cs-orange flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-800 text-xl tracking-widest text-cs-text uppercase">
            CS <span className="text-cs-orange">Skins</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-body font-medium text-cs-muted">
          <a href="#carousel" className="hover:text-cs-text transition-colors">Destaques</a>
          <a href="#grid"     className="hover:text-cs-text transition-colors">Coleção</a>
          <a href="#add"      className="hover:text-cs-text transition-colors">Adicionar</a>
        </nav>

        {/* CTA */}
        <a
          href="#add"
          className="text-xs font-body font-semibold uppercase tracking-wider px-4 py-2 rounded border border-cs-orange text-cs-orange hover:bg-cs-orange hover:text-white transition-all duration-200"
        >
          + Nova Skin
        </a>
      </div>
    </header>
  )
}
