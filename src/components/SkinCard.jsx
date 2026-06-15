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
      className="relative group rounded-xl overflow-hidden bg-cs-surface border transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl"
      style={{ 
        borderColor: `${cfg.color}33`,
        boxShadow: `inset 0 0 20px ${cfg.glow}`
      }}
      onMouseEnter={e => { 
        e.currentTarget.style.borderColor = cfg.color;
        e.currentTarget.style.boxShadow = `0 0 30px ${cfg.glow}, inset 0 0 20px ${cfg.glow}`;
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.borderColor = `${cfg.color}33`;
        e.currentTarget.style.boxShadow = `inset 0 0 20px ${cfg.glow}`;
      }}
    >
      {/* Rarity Indicator - Barra lateral ou superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: cfg.color }} />

      {/* Image area com brilho de fundo da cor da raridade */}
      <div className="relative flex items-center justify-center h-40 sm:h-48 p-4 overflow-hidden">
        {/* Glow effect behind image */}
        <div 
          className="absolute inset-0 opacity-20 blur-3xl rounded-full scale-75"
          style={{ backgroundColor: cfg.color }}
        />
        
        <img
          src={proxiedImage}
          alt={`${arma} | ${nome}`}
          className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-125"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Raridade badge flutuante */}
        <span
          className="absolute top-3 right-3 text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded shadow-sm z-20"
          style={{ 
            backgroundColor: cfg.color, 
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 bg-gradient-to-t from-cs-bg/80 to-transparent relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: cfg.color }}>{arma}</p>
        <h3 className="font-display font-bold text-cs-text leading-tight line-clamp-2 min-h-[2.5rem] text-sm sm:text-base group-hover:text-white transition-colors">
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
          <span className="font-display font-black text-cs-blue text-base">
            {formatPrice(preco || 150)}
          </span>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
        </div>
      </div>

      {/* Hover overlay shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </article>
  )
}
