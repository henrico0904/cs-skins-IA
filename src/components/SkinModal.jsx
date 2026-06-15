import { getRaridade, formatPrice, WEAR_LEVELS } from '../lib/utils'

export default function SkinModal({ skin, onClose }) {
  if (!skin) return null
  
  const cfg = getRaridade(skin.raridade)
  const basePrice = skin.preco || 150

  const proxiedImage = skin.imagem_url 
    ? `https://wsrv.nl/?url=${encodeURIComponent(skin.imagem_url)}&w=800&output=webp`
    : 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-cs-bg/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-cs-surface border border-cs-border rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl animate-fade-in">
        {/* Rarity top bar */}
        <div className="h-2 w-full" style={{ backgroundColor: cfg.color }} />

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-cs-blue/5 to-transparent border-b lg:border-b-0 lg:border-r border-cs-border">
            <div 
              className="absolute inset-0 opacity-10 blur-3xl"
              style={{ backgroundColor: cfg.color }}
            />
            <img 
              src={proxiedImage} 
              alt={skin.nome} 
              className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-500"
            />
            
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 p-3 rounded-full bg-cs-bg/50 text-white hover:bg-cs-bg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 sm:p-12">
            <div className="mb-8">
              <p className="text-cs-blue font-bold uppercase tracking-[0.3em] text-xs mb-2">{skin.arma}</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white leading-none mb-4">
                {skin.nome}
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                   style={{ backgroundColor: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}44` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                {cfg.label}
              </div>
            </div>

            {/* Price Table - Float Simulator */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cs-muted uppercase tracking-widest flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Estimativa de Preço por Desgaste (Float)
              </h3>
              
              <div className="grid gap-2">
                {WEAR_LEVELS.map((wear) => (
                  <div key={wear.id} className="flex items-center justify-between p-4 rounded-xl bg-cs-bg/50 border border-cs-border hover:border-cs-blue/30 transition-colors group">
                    <div>
                      <p className="text-white font-bold text-sm">{wear.name}</p>
                      <p className="text-[10px] text-cs-muted font-mono">{wear.float}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cs-blue font-display font-black text-lg">
                        {formatPrice(basePrice * wear.multiplier)}
                      </p>
                      <p className={`text-[10px] font-bold ${wear.multiplier >= 1 ? 'text-green-400' : 'text-red-400'}`}>
                        {wear.multiplier >= 1 ? '+' : ''}{(wear.multiplier * 100 - 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 bg-cs-blue hover:bg-cs-blue/80 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-cs-blue/25">
                Comprar Agora
              </button>
              <button className="p-4 rounded-2xl bg-cs-bg border border-cs-border text-white hover:text-cs-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
