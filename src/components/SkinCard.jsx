import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin, onDelete, onToggleFavorite, isFavorite, compact = false }) {
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  // As imagens do Steam às vezes falham devido ao hotlinking. 
  // Vou garantir que a URL seja limpa e usar um fallback visual se falhar.
  const displayImage = imagem_url ? imagem_url : 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500'

  return (
    <article
      className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-cs-surface to-cs-bg border border-cs-border/50
                 transition-all duration-300 hover:border-cs-blue/60 hover:scale-[1.05] hover:shadow-2xl"
      style={{
        '--glow': cfg.glow,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px 10px var(--glow)` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Rarity accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cs-blue via-cs-gold to-cs-blue opacity-80" />

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          onToggleFavorite(skin)
        }}
        className={`absolute top-3 left-3 z-10 p-1.5 rounded-lg backdrop-blur-md transition-all duration-300 ${
          isFavorite 
          ? 'bg-cs-gold text-cs-bg scale-110 shadow-lg' 
          : 'bg-cs-bg/40 text-white/50 hover:text-cs-gold hover:bg-cs-bg/60 opacity-0 group-hover:opacity-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {/* Image area */}
      <div className={`relative bg-gradient-to-b from-cs-blue/10 to-transparent flex items-center justify-center overflow-hidden p-4 ${compact ? 'h-32' : 'h-48'}`}>
        <img
          src={displayImage}
          alt={`${arma} | ${nome}`}
          className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-125"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Se a imagem falhar, tenta usar uma imagem genérica ou esconde
            e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
          }}
        />

        {/* Raridade badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md"
          style={{ 
            background: `${cfg.color}44`, 
            color: cfg.color, 
            border: `1px solid ${cfg.color}66`,
          }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 bg-cs-surface/50 backdrop-blur-sm">
        <p className="text-cs-muted text-[10px] font-bold uppercase tracking-widest mb-1">{arma}</p>
        <h3 className={`font-display font-bold text-cs-text leading-tight line-clamp-2 min-h-[2.5rem] ${compact ? 'text-sm' : 'text-base'}`}>
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-cs-muted uppercase font-bold">Valor Est.</span>
            <span className="font-display font-black text-cs-blue text-lg leading-none">
              {formatPrice(preco)}
            </span>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(skin.id)}
              className="p-2 text-cs-muted hover:text-red-400 transition-colors hover:bg-red-400/10 rounded-lg"
              title="Remover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Overlay shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </article>
  )
}
