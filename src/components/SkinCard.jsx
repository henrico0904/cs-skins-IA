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
      className="relative group bg-cs-surface border border-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      {/* Rarity BG on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0"
        style={{ backgroundColor: cfg.color }}
      />

      {/* Rarity Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: cfg.color }} />

      {/* Image Area */}
      <div className="relative flex items-center justify-center h-44 sm:h-52 p-6 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 blur-3xl scale-90 group-hover:opacity-20 transition-all duration-700"
          style={{ backgroundColor: cfg.color }}
        />
        
        <img
          src={proxiedImage}
          alt={`${arma} | ${nome}`}
          className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Technical Label */}
        <div className="absolute bottom-4 left-4 z-20">
          <span
            className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border border-white/10 backdrop-blur-md"
            style={{ 
              backgroundColor: `${cfg.color}CC`, 
              color: cfg.color === '#FFFFFF' ? '#000' : '#fff',
            }}
          >
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 bg-black/20 relative z-10 border-t border-white/5">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 opacity-40">{arma}</p>
        <h3 className="font-display font-black text-cs-text leading-tight line-clamp-2 min-h-[3rem] text-base group-hover:text-white transition-colors uppercase">
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <span className="font-display font-black text-cs-blue text-lg">
            {formatPrice(preco || 150)}
          </span>
          <div className="w-2 h-2" style={{ backgroundColor: cfg.color }} />
        </div>
      </div>
    </article>
  )
}
