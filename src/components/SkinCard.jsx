import { useState } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin, onToggleFavorite, isFavorite }) {
  if (!skin) return null
  
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)
  const [justAdded, setJustAdded] = useState(false)

  const proxiedImage = imagem_url 
    ? `https://wsrv.nl/?url=${encodeURIComponent(imagem_url)}&w=400&output=webp`
    : 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500'

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    const success = onToggleFavorite(skin)
    if (success && !isFavorite) {
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)
    }
  }

  const handleAcquireClick = (e) => {
    e.stopPropagation()
    // Redireciona para o Mercado da Comunidade Steam com o filtro da skin
    const steamMarketUrl = `https://steamcommunity.com/market/search?appid=730&q=${encodeURIComponent(`${arma} | ${nome}`)}`
    window.open(steamMarketUrl, '_blank')
  }

  return (
    <article
      className="relative group bg-cs-surface border border-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      style={{ borderTop: `4px solid ${cfg.color}` }}
    >
      {/* Rarity Background Color */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{ backgroundColor: cfg.color }}
      />

      {/* Favorite Button */}
      <button 
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-30 p-2 transition-all ${
          isFavorite ? 'text-cs-gold scale-110' : 'text-white/20 hover:text-white hover:scale-110'
        }`}
      >
        <svg className="w-6 h-6" fill={isFavorite || justAdded ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {/* Image Area */}
      <div className="relative flex items-center justify-center h-44 sm:h-52 p-6 overflow-hidden cursor-pointer">
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
        />

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
        
        <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-cs-blue text-lg">
              {formatPrice(preco || 150)}
            </span>
            <div className="w-2 h-2" style={{ backgroundColor: cfg.color }} />
          </div>
          
          <button 
            onClick={handleAcquireClick}
            className="w-full py-3 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
          >
            ADQUIRIR ITEM
          </button>
        </div>
      </div>
    </article>
  )
}
