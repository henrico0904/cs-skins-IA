export default function GameNav({ spinsLeft, view, onViewChange, onOpenCaseOpening }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cs-bg/95 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Giros Diários */}
          <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xl">🎰</span>
            <div>
              <p className="text-[9px] text-cs-muted uppercase font-black tracking-widest">Giros Hoje</p>
              <p className={`text-xl font-black ${spinsLeft > 0 ? 'text-cs-blue' : 'text-red-500'}`}>{spinsLeft}</p>
            </div>
          </div>

          {/* Navegação Central */}
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all ${
                view === 'catalog'
                  ? 'bg-cs-blue text-white shadow-lg shadow-cs-blue/20'
                  : 'text-cs-muted hover:text-white'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all ${
                view === 'favorites'
                  ? 'bg-cs-gold text-cs-bg shadow-lg shadow-cs-gold/20'
                  : 'text-cs-muted hover:text-white'
              }`}
            >
              Favoritas
            </button>
          </div>

          {/* Botão Roleta */}
          <button
            onClick={onOpenCaseOpening}
            className={`px-8 py-3 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 ${
              spinsLeft > 0 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-cs-border text-cs-muted cursor-not-allowed opacity-50'
            }`}
          >
            Abrir Case
          </button>

        </div>
      </div>
    </div>
  )
}
