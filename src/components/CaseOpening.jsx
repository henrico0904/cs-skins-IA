import { useState, useRef } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function CaseOpening({ skins, inventoryCount, inventoryLimit, onClose, onAddFavorite }) {
  const [spinning, setSpinning] = useState(false)
  const [wonSkin, setWonSkin] = useState(null)
  const [rouletteSkins, setRouletteSkins] = useState([])
  const trackRef = useRef(null)

  // Probabilidades reais baseadas no CS:GO
  const ODDS = [
    { label: 'Consumível',  chance: 0.40, color: '#b0c3d9' },
    { label: 'Industrial',  chance: 0.25, color: '#5e98d9' },
    { label: 'Mil-spec',    chance: 0.15, color: '#4b69ff' },
    { label: 'Restrita',    chance: 0.10, color: '#8847ff' },
    { label: 'Classificada', chance: 0.06, color: '#d32ce6' },
    { label: 'Secreta',     chance: 0.03, color: '#eb4b4b' },
    { label: 'Rara',        chance: 0.01, color: '#FFD700' },
  ]

  const getRandomSkin = () => {
    const rand = Math.random()
    let cumulative = 0
    let targetLabel = 'Consumível'

    for (const odd of ODDS) {
      cumulative += odd.chance
      if (rand <= cumulative) {
        targetLabel = odd.label
        break
      }
    }

    const pool = skins.filter(s => {
      const cfg = getRaridade(s.raridade)
      // Ajuste para bater o label da config com o da skin
      return cfg.label === targetLabel || (targetLabel === 'Rara' && (cfg.label === 'Contrabandeada' || cfg.label === 'Rara'))
    })

    if (pool.length === 0) return skins[Math.floor(Math.random() * skins.length)]
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const openCase = () => {
    if (inventoryCount >= inventoryLimit) {
      alert("Seu inventário está cheio! Use a Central de Trocas ou remova itens.")
      return
    }
    if (spinning) return

    const newList = []
    for (let i = 0; i < 50; i++) newList.push(getRandomSkin())
    
    setRouletteSkins(newList)
    setWonSkin(null)
    setSpinning(true)

    const winner = newList[45]
    
    setTimeout(() => {
      if (trackRef.current) {
        const offset = -(45 * 100 + 50 - 200)
        trackRef.current.style.transform = `translateY(${offset}px)`
      }
    }, 50)

    setTimeout(() => {
      setWonSkin(winner)
      setSpinning(false)
    }, 5200)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-cs-surface border border-white/10 w-full max-w-6xl shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in overflow-hidden">
        <div className="bg-white/5 border-b border-white/10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-cs-blue" />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Sistema de Containers</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] text-cs-muted font-black uppercase tracking-widest">Capacidade</p>
              <p className="text-sm font-black text-white">{inventoryCount}/{inventoryLimit}</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/10 p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Probabilities Panel */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-black/40 border border-white/5 p-6">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 pb-4 border-b border-white/5">Probabilidades</h3>
                <div className="space-y-3">
                  {ODDS.map(odd => (
                    <div key={odd.label} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ backgroundColor: odd.color }} />
                        <span className="text-cs-muted">{odd.label}</span>
                      </div>
                      <span className="text-white">{(odd.chance * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={openCase}
                disabled={spinning || inventoryCount >= inventoryLimit}
                className={`w-full py-6 font-black text-sm tracking-[0.4em] transition-all ${
                  !spinning && inventoryCount < inventoryLimit
                    ? 'bg-white text-black hover:bg-cs-blue hover:text-white'
                    : 'bg-white/5 text-cs-muted cursor-not-allowed'
                }`}
              >
                {spinning ? 'SORTEANDO...' : 'ABRIR CONTAINER'}
              </button>
            </div>

            {/* Roulette Track */}
            <div className="lg:col-span-9">
              <div className="roulette-container relative border border-white/10 bg-black/60">
                <div className="roulette-pointer" />
                {rouletteSkins.length > 0 ? (
                  <div ref={trackRef} className="roulette-track" style={{ transform: 'translateY(0px)' }}>
                    {rouletteSkins.map((skin, i) => {
                      const cfg = getRaridade(skin.raridade)
                      return (
                        <div key={i} className="roulette-item border-b border-white/5">
                          <div className="w-1.5 h-full mr-6" style={{ backgroundColor: cfg.color }} />
                          <div className="w-16 h-16 flex-shrink-0 mr-6"><img src={`https://wsrv.nl/?url=${encodeURIComponent(skin.imagem_url)}&w=100&output=webp`} className="w-full h-full object-contain" alt="" /></div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-40">{skin.arma}</p>
                            <p className="text-sm font-black text-white uppercase">{skin.nome}</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[9px] font-black px-3 py-1 border border-white/10" style={{ color: cfg.color }}>{cfg.label}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-10">
                    <p className="font-black uppercase tracking-[1em] text-xs">Aguardando Comando</p>
                  </div>
                )}
              </div>

              {wonSkin && !spinning && (
                <div className="mt-6 p-6 bg-white/5 border border-white/10 flex items-center gap-8 animate-fade-in">
                  <div className="w-24 h-24 flex-shrink-0 bg-black/40 p-4 border border-white/5">
                    <img src={`https://wsrv.nl/?url=${encodeURIComponent(wonSkin.imagem_url)}&w=200&output=webp`} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-cs-blue text-[9px] font-black uppercase tracking-[0.3em] mb-1">{wonSkin.arma}</p>
                    <h3 className="text-xl font-black text-white uppercase mb-4">{wonSkin.nome}</h3>
                    <button onClick={() => onAddFavorite(wonSkin)} className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-cs-blue hover:text-white transition-all">Adicionar ao Inventário</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
