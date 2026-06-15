export default function GameNav({ coins, view, onViewChange, onOpenAimTrainer, onOpenDefuseGame, onOpenCaseOpening }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cs-bg/95 backdrop-blur-xl border-t border-cs-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Moedas */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-cs-blue/10 border border-cs-blue/30">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-xs text-cs-muted uppercase font-bold">Moedas</p>
              <p className="text-2xl font-black text-cs-gold">{coins}</p>
            </div>
          </div>

          {/* Navegação */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-4 py-2 rounded-lg font-bold uppercase text-xs transition-all ${
                view === 'catalog'
                  ? 'bg-cs-blue text-white'
                  : 'bg-cs-bg border border-cs-border text-cs-muted hover:text-cs-blue'
              }`}
            >
              📚 Catálogo
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`px-4 py-2 rounded-lg font-bold uppercase text-xs transition-all ${
                view === 'favorites'
                  ? 'bg-cs-gold text-cs-bg'
                  : 'bg-cs-bg border border-cs-border text-cs-muted hover:text-cs-gold'
              }`}
            >
              ⭐ Favoritas
            </button>
          </div>

          {/* Mini-Games */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={onOpenAimTrainer}
              className="px-4 py-2 rounded-lg font-bold uppercase text-xs bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:scale-105 transition-transform"
              title="Ganhe moedas jogando Aim Trainer"
            >
              🎯 Aim
            </button>
            <button
              onClick={onOpenDefuseGame}
              className="px-4 py-2 rounded-lg font-bold uppercase text-xs bg-gradient-to-r from-red-600 to-orange-600 text-white hover:scale-105 transition-transform"
              title="Ganhe moedas jogando Defuse"
            >
              💣 Defuse
            </button>
            <button
              onClick={onOpenCaseOpening}
              className="px-4 py-2 rounded-lg font-bold uppercase text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-transform disabled:opacity-50"
              disabled={coins < 50}
              title="Abra cases com suas moedas"
            >
              🎰 Case
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
