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
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative bg-cs-surface border border-white/10 w-full max-w-5xl shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in">
        <div className="h-1.5 w-full" style={{ backgroundColor: cfg.color }} />

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-12 flex flex-col items-center justify-center relative bg-black/40 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="absolute inset-0 opacity-5 blur-[100px]" style={{ backgroundColor: cfg.color }} />
            <img 
              src={proxiedImage} 
              alt={skin.nome} 
              className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
            
            <button 
              onClick={onClose}
              className="absolute top-8 left-8 p-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-12">
            <div className="mb-10">
              <p className="text-cs-blue font-black uppercase tracking-[0.4em] text-[10px] mb-3">{skin.arma}</p>
              <h2 className="text-5xl font-black text-white leading-none mb-6 uppercase tracking-tighter">
                {skin.nome}
              </h2>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em]"
                   style={{ color: cfg.color }}>
                <div className="w-2 h-2" style={{ backgroundColor: cfg.color }} />
                Raridade: {cfg.label}
              </div>
            </div>

            {/* Price Table */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-cs-muted uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-4 h-px bg-cs-muted/30" />
                Matriz de Desgaste e Valor
              </h3>
              
              <div className="grid gap-px bg-white/5 border border-white/5">
                {WEAR_LEVELS.map((wear) => (
                  <div key={wear.id} className="flex items-center justify-between p-5 bg-cs-surface hover:bg-white/5 transition-colors group">
                    <div>
                      <p className="text-white font-black text-xs uppercase tracking-widest">{wear.name}</p>
                      <p className="text-[9px] text-cs-muted font-mono mt-1 opacity-50">FLOAT: {wear.float}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cs-blue font-black text-xl tracking-tighter">
                        {formatPrice(basePrice * wear.multiplier)}
                      </p>
                      <p className={`text-[10px] font-black mt-1 ${wear.multiplier >= 1 ? 'text-green-500' : 'text-red-500'}`}>
                        {wear.multiplier >= 1 ? 'UPGRADE' : 'DEGRADED'} {Math.abs(wear.multiplier * 100 - 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="flex-1 bg-white text-black font-black py-5 text-xs uppercase tracking-[0.3em] hover:bg-cs-blue hover:text-white transition-all active:scale-95">
                Adquirir Item
              </button>
              <button className="px-6 border border-white/10 text-white hover:bg-white/5 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
