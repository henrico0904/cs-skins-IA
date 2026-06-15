import { useState, useRef, useEffect } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function CaseOpening({ skins, spinsLeft, onClose, onUseSpin, onAddFavorite }) {
  const [spinning, setSpinning] = useState(false)
  const [wonSkin, setWonSkin] = useState(null)
  const [rouletteSkins, setRouletteSkins] = useState([])
  const trackRef = useRef(null)

  // Prepara a lista de skins para a roleta
  const prepareRoulette = () => {
    const list = []
    for (let i = 0; i < 50; i++) {
      const rand = Math.random()
      let pool
      if (rand < 0.70) pool = skins.filter(s => getRaridade(s.raridade).label === 'Normal')
      else if (rand < 0.95) pool = skins.filter(s => getRaridade(s.raridade).label === 'Épica')
      else pool = skins.filter(s => getRaridade(s.raridade).label === 'Rara')
      
      if (pool.length === 0) pool = skins
      list.push(pool[Math.floor(Math.random() * pool.length)])
    }
    return list
  }

  const openCase = () => {
    if (spinsLeft <= 0 || spinning) return

    const newList = prepareRoulette()
    setRouletteSkins(newList)
    setWonSkin(null)
    setSpinning(true)
    onUseSpin()

    // A skin vencedora será a de índice 45 (quase no final)
    const winner = newList[45]
    
    // Inicia animação após um pequeno delay para garantir que o track renderizou
    setTimeout(() => {
      if (trackRef.current) {
        // Cada item tem 100px. Queremos centralizar o item 45 no container de 400px.
        // O centro do container é 200px. O centro do item 45 é 45 * 100 + 50.
        // Deslocamento = -(45 * 100 + 50 - 200) = -4350px
        const offset = -(45 * 100 + 50 - 200)
        trackRef.current.style.transform = `translateY(${offset}px)`
      }
    }, 50)

    setTimeout(() => {
      setWonSkin(winner)
      setSpinning(false)
    }, 5200) // 5s da transição + buffer
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-cs-surface border border-white/10 w-full max-w-5xl shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in">
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-cs-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Sorteio Diário</h2>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-black/40 border border-white/5 p-8">
                <p className="text-cs-muted text-[10px] uppercase font-black tracking-[0.3em] mb-2">Créditos de Abertura</p>
                <p className={`text-6xl font-black mb-6 ${spinsLeft > 0 ? 'text-white' : 'text-red-600'}`}>
                  {spinsLeft.toString().padStart(2, '0')}
                </p>
                <button
                  onClick={openCase}
                  disabled={spinsLeft <= 0 || spinning}
                  className={`w-full py-6 font-black text-lg tracking-widest transition-all ${
                    spinsLeft > 0 && !spinning
                      ? 'bg-cs-blue text-white hover:bg-cs-blue/80'
                      : 'bg-white/5 text-cs-muted cursor-not-allowed'
                  }`}
                >
                  {spinning ? 'PROCESSANDO...' : 'INICIAR SORTEIO'}
                </button>
                <p className="text-[9px] text-cs-muted mt-4 font-bold uppercase tracking-widest">Limite de 20 acessos a cada 24 horas</p>
              </div>
            </div>

            {/* Roulette View */}
            <div className="lg:col-span-8">
              <div className="roulette-container relative border border-white/10 bg-black/60">
                <div className="roulette-pointer" />
                
                {rouletteSkins.length > 0 ? (
                  <div 
                    ref={trackRef} 
                    className="roulette-track"
                    style={{ transform: 'translateY(0px)' }}
                  >
                    {rouletteSkins.map((skin, i) => {
                      const cfg = getRaridade(skin.raridade)
                      return (
                        <div key={i} className="roulette-item group">
                          <div className="w-1.5 h-full mr-6" style={{ backgroundColor: cfg.color }} />
                          <div className="w-16 h-16 flex-shrink-0 mr-6">
                            <img 
                              src={`https://wsrv.nl/?url=${encodeURIComponent(skin.imagem_url)}&w=100&output=webp`} 
                              className="w-full h-full object-contain"
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{skin.arma}</p>
                            <p className="text-sm font-black text-white uppercase">{skin.nome}</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[10px] font-black px-2 py-1 border border-white/10" style={{ color: cfg.color }}>
                              {cfg.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="font-black uppercase tracking-[0.5em] text-xs">Aguardando Início</p>
                  </div>
                )}
              </div>

              {/* Result Overlay */}
              {wonSkin && !spinning && (
                <div className="mt-6 p-8 bg-white/5 border border-white/10 flex items-center gap-8 animate-fade-in">
                  <div className="w-32 h-32 flex-shrink-0 bg-black/40 p-4 border border-white/5">
                    <img 
                      src={`https://wsrv.nl/?url=${encodeURIComponent(wonSkin.imagem_url)}&w=200&output=webp`} 
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-cs-blue text-[10px] font-black uppercase tracking-[0.3em] mb-1">{wonSkin.arma}</p>
                    <h3 className="text-2xl font-black text-white uppercase mb-4">{wonSkin.nome}</h3>
                    <button
                      onClick={() => onAddFavorite(wonSkin)}
                      className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-cs-blue hover:text-white transition-all"
                    >
                      Salvar na Coleção
                    </button>
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
