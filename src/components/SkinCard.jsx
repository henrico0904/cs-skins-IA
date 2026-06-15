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
      className="relative group rounded-[2rem] overflow-hidden bg-cs-surface border border-white/5 transition-all duration-700 hover:scale-[1.1] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Dynamic Background Color on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-0"
        style={{ backgroundColor: cfg.color }}
      />

      {/* Rarity Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20" style={{ backgroundColor: cfg.color }} />

      {/* Image Area */}
      <div className="relative flex items-center justify-center h-44 sm:h-52 p-6 overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-5 blur-3xl rounded-full scale-90 group-hover:opacity-30 transition-all duration-700"
          style={{ backgroundColor: cfg.color }}
        />
        
        <img
          src={proxiedImage}
          alt={`${arma} | ${nome}`}
          className="relative z-10 h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-125 group-hover:-rotate-6"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Floating Label */}
        <div className="absolute bottom-4 left-4 z-20">
          <span
            className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-2xl backdrop-blur-xl border border-white/10"
            style={{ 
              backgroundColor: `${cfg.color}CC`, 
              color: cfg.color === '#FFFFFF' ? '#000' : '#fff',
            }}
          >
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 bg-gradient-to-t from-black/40 to-transparent relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-40">{arma}</p>
        <h3 className="font-display font-black text-cs-text leading-tight line-clamp-2 min-h-[3rem] text-base sm:text-lg group-hover:text-white transition-colors">
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <span className="font-display font-black text-cs-blue text-xl">
            {formatPrice(preco || 150)}
          </span>
          <div 
            className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:animate-ping" 
            style={{ backgroundColor: cfg.color }} 
          />
        </div>
      </div>

      {/* Interaction Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
    </article>
  )
}
