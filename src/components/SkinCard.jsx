import { getRaridade, formatPrice } from '../lib/utils'

export default function SkinCard({ skin, onDelete, compact = false }) {
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  return (
    <article
      className="relative group rounded-xl overflow-hidden bg-cs-surface border border-cs-border
                 transition-all duration-300 hover:border-opacity-60 hover:scale-[1.02]"
      style={{
        '--glow': cfg.glow,
        boxShadow: '0 0 0 0 transparent',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 24px 4px var(--glow)` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent' }}
    >
      {/* Rarity accent strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: cfg.color }} />

      {/* Image area */}
      <div className={`relative bg-gradient-to-b from-cs-border/30 to-transparent flex items-center justify-center ${compact ? 'h-28' : 'h-40'}`}>
        {imagem_url ? (
          <img
            src={imagem_url}
            alt={`${arma} | ${nome}`}
            className="h-full object-contain p-3 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="text-cs-muted text-4xl">🔫</div>
        )}

        {/* Raridade badge */}
        <span
          className="absolute top-2 right-2 text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}55` }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-cs-muted text-[11px] font-body uppercase tracking-widest mb-0.5">{arma}</p>
        <h3 className={`font-display font-bold text-cs-text leading-tight ${compact ? 'text-base' : 'text-lg'}`}>
          {nome}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-cs-orange text-base">
            {formatPrice(preco)}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(skin.id)}
              className="text-cs-muted hover:text-red-400 transition-colors text-xs"
              title="Remover"
              aria-label={`Remover ${nome}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
