import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin }) {
  if (!skin) return null
  
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  const proxiedImage = imagem_url 
    ? `https://wsrv.nl/?url=${encodeURIComponent(imagem_url)}&w=400&output=webp`
    : 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500'

  return (
    <article
      className="relative group rounded-2xl overflow-hidden bg-cs-surface border transition-all duration-500 hover:scale-[1.08] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      style={{ 
        borderColor: `${cfg.color}22`,
      }}
    >
      {/* Rarity Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: cfg.color }} />

      {/* Image Area */}
      <div className="relative flex items-center justify-center h-40 sm:h-48 p-4 overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-10 blur-2xl rounded-full scale-75 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: cfg.color }}
        />
        
        <img
          src={proxiedImage}
          alt={`${arma} | ${nome}`}
          className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Floating Label */}
        <div className="absolute bottom-2 left-2 z-20 flex gap-1">
          <span
            className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-lg backdrop-blur-md border border-white/10"
            style={{ 
              backgroundColor: cfg.color, 
              color: cfg.color === '#FFFFFF' ? '#000' : '#fff',
            }}
          >
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-cs-surface relative z-10">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1 opacity-50">{arma}</p>
        <h3 className="font-display font-bold text-cs-text leading-tight line-clamp-2 min-h-[2.5rem] text-sm sm:text-base group-hover:text-white transition-colors">
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <span className="font-display font-black text-cs-blue text-base">
            {formatPrice(preco || 150)}
          </span>
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
          </div>
        </div>
      </div>

      {/* Interaction Layer */}
      <div className="absolute inset-0 bg-cs-blue/0 group-hover:bg-cs-blue/5 transition-colors duration-500 pointer-events-none" />
    </article>
  )
}
