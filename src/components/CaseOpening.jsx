import { useState, useRef } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function CaseOpening({ skins, inventoryCount, inventoryLimit, onClose, onAddFavorite }) {
  const [spinning, setSpinning] = useState(false)
  const [wonSkin, setWonSkin] = useState(null)
  const [rouletteSkins, setRouletteSkins] = useState([])
  const [showWinPopup, setShowWinPopup] = useState(false)
  const [addedToInv, setAddedToInv] = useState(false)
  const trackRef = useRef(null)

  const ODDS = [
    { rarity: 'Consumível',   chance: 0.35, color: '#FFFFFF' },
    { rarity: 'Industrial',   chance: 0.25, color: '#FFFFFF' },
    { rarity: 'Mil-spec',     chance: 0.15, color: '#FFFFFF' },
    { rarity: 'Restrita',     chance: 0.10, color: '#A335EE' },
    { rarity: 'Classificada', chance: 0.08, color: '#A335EE' },
    { rarity: 'Secreta',      chance: 0.05, color: '#FFD700' },
    { rarity: 'Contrabandeada', chance: 0.02, color: '#FFD700' },
  ]

  const getRandomSkin = () => {
    const rand = Math.random()
    let cumulative = 0
    let targetRarity = 'Consumível'
    for (const odd of ODDS) {
      cumulative += odd.chance
      if (rand <= cumulative) {
        targetRarity = odd.rarity
        break
      }
    }
    const pool = skins.filter(s => s.raridade === targetRarity)
    return pool[Math.floor(Math.random() * pool.length)] || skins[0]
  }

  const openCase = () => {
    if (inventoryCount >= inventoryLimit) {
      alert("Seu inventário está cheio!")
      return
    }
    if (spinning) return

    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
      trackRef.current.style.transform = 'translateY(0px)'
    }

    const newList = []
    for (let i = 0; i < 50; i++) newList.push(getRandomSkin())
    
    setRouletteSkins(newList)
    setWonSkin(null)
    setShowWinPopup(false)
    setAddedToInv(false)
    
    setTimeout(() => {
      setSpinning(true)
      const winner = newList[45]
      
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 5s cubic-bezier(0.15, 0, 0.05, 1)'
        const offset = -(45 * 100 + 50 - 200)
        trackRef.current.style.transform = `translateY(${offset}px)`
      }

      setTimeout(() => {
        setWonSkin(winner)
        setSpinning(false)
        setShowWinPopup(true) // Mostra o pop-up de vitória
      }, 5100)
    }, 50)
  }

  const handleAddToInventory = () => {
    if (wonSkin && !addedToInv) {
      const success = onAddFavorite(wonSkin)
      if (success) {
        setAddedToInv(true)
        setTimeout(() => setShowWinPopup(false), 1000) // Fecha após 1s de sucesso
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-cs-surface border border-white/10 w-full max-w-6xl shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in overflow-hidden">
        {/* Header */}
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
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-black/40 border border-white/5 p-6">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 pb-4 border-b border-white/5">Probabilidades</h3>
                <div className="space-y-3">
                  {ODDS.map(odd => (
                    <div key={odd.rarity} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ backgroundColor: odd.color }} />
                        <span className="text-cs-muted">{odd.rarity}</span>
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

            {/* Roulette View */}
            <div className="lg:col-span-9">
              <div className="roulette-container relative border border-white/10 bg-black/60">
                <div className="roulette-pointer" />
                {rouletteSkins.length > 0 ? (
                  <div ref={trackRef} className="roulette-track">
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
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-10">
                    <p className="font-black uppercase tracking-[1em] text-xs">Inicie o Sorteio</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* WIN POPUP MODAL */}
        {showWinPopup && wonSkin && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-8 animate-fade-in">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <div className="relative bg-cs-surface border border-white/10 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,1)] text-center transform scale-110">
              <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: getRaridade(wonSkin.raridade).color }} />
              
              <div className="mb-8 relative">
                <div className="absolute inset-0 blur-[100px] opacity-20" style={{ backgroundColor: getRaridade(wonSkin.raridade).color }} />
                <img 
                  src={`https://wsrv.nl/?url=${encodeURIComponent(wonSkin.imagem_url)}&w=500&output=webp`} 
                  className="relative z-10 w-full h-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-pulse" 
                  alt="" 
                />
              </div>

              <p className="text-cs-blue font-black uppercase tracking-[0.5em] text-xs mb-2">{wonSkin.arma}</p>
              <h3 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter leading-none">{wonSkin.nome}</h3>
              
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 mb-10">
                <div className="w-2 h-2" style={{ backgroundColor: getRaridade(wonSkin.raridade).color }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: getRaridade(wonSkin.raridade).color }}>
                  Raridade: {getRaridade(wonSkin.raridade).label}
                </span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToInventory}
                  disabled={addedToInv}
                  className={`flex-1 py-5 font-black text-xs uppercase tracking-[0.3em] transition-all ${
                    addedToInv 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-black hover:bg-cs-blue hover:text-white'
                  }`}
                >
                  {addedToInv ? '✓ ADICIONADO' : 'ADICIONAR AO INVENTÁRIO'}
                </button>
                <button 
                  onClick={() => setShowWinPopup(false)}
                  className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10"
                >
                  DESCARTAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
