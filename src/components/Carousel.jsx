import { useState, useRef, useEffect } from 'react'
import SkinCard from './SkinCard'
import { formatPrice, getRaridade } from '../lib/utils'

function CarouselItem({ skin }) {
  const { nome, arma, preco, raridade, imagem_url } = skin
  const cfg = getRaridade(raridade)

  return (
    <div
      className="relative flex-shrink-0 w-48 sm:w-56 mx-2 rounded-xl overflow-hidden bg-cs-surface border border-cs-border group cursor-default"
      style={{ '--glow': cfg.glow }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: cfg.color }} />

      <div className="h-32 flex items-center justify-center bg-gradient-to-b from-cs-border/20 to-transparent p-3">
        {imagem_url ? (
          <img
            src={imagem_url}
            alt={`${arma} | ${nome}`}
            className="h-full object-contain drop-shadow-lg"
            loading="lazy"
          />
        ) : (
          <span className="text-5xl">🔫</span>
        )}
      </div>

      <div className="px-3 pb-3">
        <p className="text-[10px] font-body text-cs-muted uppercase tracking-widest">{arma}</p>
        <p className="font-display font-bold text-cs-text text-sm leading-tight">{nome}</p>
        <p className="font-display font-bold mt-1" style={{ color: cfg.color }}>
          {formatPrice(preco)}
        </p>
      </div>
    </div>
  )
}

export default function Carousel({ skins }) {
  const top = skins.slice(0, 8)
  const doubled = [...top, ...top] // infinito loop visual

  const [paused, setPaused] = useState(false)

  return (
    <section id="carousel" className="mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center gap-3">
        <span className="w-1 h-5 rounded-full bg-cs-orange inline-block" />
        <h2 className="font-display font-bold text-xl text-cs-text uppercase tracking-widest">
          Mais Valiosas
        </h2>
        <span className="text-cs-muted text-sm font-body ml-auto">Top {top.length}</span>
      </div>

      {/* Track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-cs-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-cs-bg to-transparent" />

        <div
          className="flex py-2"
          style={{
            animation: paused ? 'none' : 'carousel 28s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((skin, i) => (
            <CarouselItem key={`${skin.id}-${i}`} skin={skin} />
          ))}
        </div>
      </div>
    </section>
  )
}
