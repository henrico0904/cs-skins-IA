export default function GameNav({ inventoryCount, inventoryLimit, view, onViewChange, onOpenCaseOpening, onOpenTradeCentral }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Inventory Status */}
          <div className="flex items-center gap-6 px-6 py-3 bg-white/5 border border-white/10">
            <div className="flex flex-col">
              <p className="text-[8px] text-cs-muted uppercase font-black tracking-[0.3em]">Inventário</p>
              <div className="flex items-center gap-3">
                <p className={`text-xl font-black ${inventoryCount >= inventoryLimit ? 'text-red-600' : 'text-white'}`}>
                  {inventoryCount.toString().padStart(2, '0')}
                </p>
                <div className="w-20 h-1 bg-white/10 relative">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ${inventoryCount >= inventoryLimit ? 'bg-red-600' : 'bg-cs-blue'}`}
                    style={{ width: `${(inventoryCount / inventoryLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-8 py-3 font-black uppercase text-[10px] tracking-[0.3em] transition-all ${
                view === 'catalog'
                  ? 'bg-cs-blue text-white'
                  : 'text-cs-muted hover:text-white hover:bg-white/5'
              }`}
            >
              Mercado
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

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onOpenTradeCentral}
              className="px-6 py-4 font-black uppercase text-[10px] tracking-[0.3em] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Contratos
            </button>
            <button
              onClick={onOpenCaseOpening}
              className="px-10 py-4 font-black uppercase text-xs tracking-[0.4em] bg-white text-black hover:bg-cs-blue hover:text-white transition-all transform active:scale-95"
            >
              Abrir Case
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
