export default function GameNav({ spinsLeft, view, onViewChange, onOpenCaseOpening }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Status Panel */}
          <div className="flex items-center gap-6 px-6 py-3 bg-white/5 border border-white/10">
            <div className="flex flex-col">
              <p className="text-[8px] text-cs-muted uppercase font-black tracking-[0.3em]">Status Sistema</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Online</span>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <p className="text-[8px] text-cs-muted uppercase font-black tracking-[0.3em]">Acessos Diários</p>
              <p className={`text-xl font-black ${spinsLeft > 0 ? 'text-cs-blue' : 'text-red-600'}`}>
                {spinsLeft.toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-8 py-3 font-black uppercase text-[10px] tracking-[0.3em] transition-all ${
                view === 'catalog'
                  ? 'bg-cs-blue text-white'
                  : 'text-cs-muted hover:text-white hover:bg-white/5'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`px-8 py-3 font-black uppercase text-[10px] tracking-[0.3em] transition-all ${
                view === 'favorites'
                  ? 'bg-cs-gold text-cs-bg'
                  : 'text-cs-muted hover:text-white hover:bg-white/5'
              }`}
            >
              Coleção
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenCaseOpening}
            disabled={spinsLeft <= 0}
            className={`px-10 py-4 font-black uppercase text-xs tracking-[0.4em] transition-all transform active:scale-95 ${
              spinsLeft > 0 
                ? 'bg-white text-black hover:bg-cs-blue hover:text-white'
                : 'bg-white/5 text-cs-muted cursor-not-allowed'
            }`}
          >
            Abrir Container
          </button>

        </div>
      </div>
    </div>
  )
}
