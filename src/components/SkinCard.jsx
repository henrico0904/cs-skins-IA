import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin }) {
  if (!skin) return null
  
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  // URL de fallback garantida
  const displayImage = imagem_url || 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500'

  return (
    <article
      className="relative group rounded-xl overflow-hidden bg-cs-surface border border-cs-border/50
                 transition-all duration-300 hover:border-cs-blue/60 hover:scale-[1.05] hover:shadow-2xl"
    >
      {/* Rarity Line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: cfg.color }} />

      {/* Image area */}
      <div className="relative bg-gradient-to-b from-cs-blue/5 to-transparent flex items-center justify-center h-40 sm:h-48 p-4">
        <img
          src={displayImage}
          alt={`${arma} | ${nome}`}
          className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-125"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Raridade badge */}
        <span
          className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-md"
          style={{ 
            backgroundColor: `${cfg.color}33`, 
            color: cfg.color, 
            border: `1px solid ${cfg.color}66`,
          }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-cs-muted text-[10px] font-bold uppercase tracking-widest mb-1">{arma}</p>
        <h3 className="font-display font-bold text-cs-text leading-tight line-clamp-2 min-h-[2.5rem] text-sm sm:text-base">
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-black text-cs-blue text-base">
            {formatPrice(preco || 100)}
          </span>
        </div>
      </div>

      {/* Hover overlay shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </article>
  )
}
