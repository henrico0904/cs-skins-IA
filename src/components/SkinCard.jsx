import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin, onDelete, compact = false }) {
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  return (
    <article
      className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-cs-surface to-cs-bg border border-cs-border/50
                 transition-all duration-300 hover:border-cs-blue/60 hover:scale-[1.05] hover:shadow-xl"
      style={{
        '--glow': cfg.glow,
        boxShadow: '0 0 0 0 transparent',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px 6px var(--glow), inset 0 0 20px rgba(0, 102, 255, 0.1)` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent' }}
    >
      {/* Rarity accent strip - gradiente azul */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cs-blue via-cs-gold to-cs-blue opacity-60" />

      {/* Image area */}
      <div className={`relative bg-gradient-to-b from-cs-blue/5 to-transparent flex items-center justify-center overflow-hidden ${compact ? 'h-32' : 'h-44'}`}>
        {imagem_url ? (
          <img
            src={imagem_url}
            alt={`${arma} | ${nome}`}
            className="h-full w-full object-contain p-3 drop-shadow-lg transition-transform duration-300 group-hover:scale-125"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="text-cs-muted text-4xl">🔫</div>
        )}

        {/* Raridade badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ 
            background: `${cfg.color}33`, 
            color: cfg.color, 
            border: `1.5px solid ${cfg.color}88`,
            boxShadow: `0 0 12px ${cfg.color}44`
          }}
        >
          {cfg.label}
        </span>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cs-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-cs-muted text-[10px] font-body font-semibold uppercase tracking-widest mb-1.5">{arma}</p>
        <h3 className={`font-display font-bold text-cs-text leading-tight line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-cs-blue text-base">
            {formatPrice(preco)}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(skin.id)}
              className="text-cs-muted hover:text-red-400 transition-colors text-xs hover:scale-110 transform duration-200"
              title="Remover"
              aria-label={`Remover ${nome}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  )
}
