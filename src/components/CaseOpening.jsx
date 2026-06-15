import { useState } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function CaseOpening({ skins, spinsLeft, onClose, onUseSpin, onAddFavorite }) {
  const [spinning, setSpinning] = useState(false)
  const [wonSkin, setWonSkin] = useState(null)
  const [history, setHistory] = useState([])

  const getRandomSkin = () => {
    const rand = Math.random()
    let selected

    if (rand < 0.60) {
      selected = skins.filter(s => getRaridade(s.raridade).label === 'Normal')
    } else if (rand < 0.90) {
      selected = skins.filter(s => getRaridade(s.raridade).label === 'Épica')
    } else {
      selected = skins.filter(s => getRaridade(s.raridade).label === 'Rara')
    }

    if (selected.length === 0) return skins[Math.floor(Math.random() * skins.length)]
    return selected[Math.floor(Math.random() * selected.length)]
  }

  const openCase = () => {
    if (spinsLeft <= 0 || spinning) return

    setSpinning(true)
    onUseSpin()

    setTimeout(() => {
      const skin = getRandomSkin()
      setWonSkin(skin)
      setHistory(prev => [skin, ...prev].slice(0, 10))
      setSpinning(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-cs-bg/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-cs-surface border border-cs-border rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">🎰 Roleta Diária</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg">✕</button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-cs-bg rounded-2xl p-6 space-y-4 border border-cs-border">
                <div>
                  <p className="text-cs-muted text-xs uppercase font-bold tracking-widest">Giros Restantes Hoje</p>
                  <p className={`text-5xl font-black ${spinsLeft > 0 ? 'text-cs-blue' : 'text-red-500'}`}>{spinsLeft}</p>
                </div>
                <button
                  onClick={openCase}
                  disabled={spinsLeft <= 0 || spinning}
                  className={`w-full py-5 font-black text-xl rounded-2xl transition-all transform ${
                    spinsLeft > 0 && !spinning
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg shadow-purple-600/20'
                      : 'bg-cs-border text-cs-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  {spinning ? 'SORTEANDO...' : 'GIRAR ROLETA'}
                </button>
                <p className="text-[10px] text-cs-muted text-center uppercase font-bold">O limite reseta automaticamente a cada 24h</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-purple-600/5 to-pink-600/5 rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-50" />
                
                {wonSkin ? (
                  <div className="text-center w-full relative z-10 animate-fade-in">
                    <div className="mb-6 transform transition-all hover:scale-110 duration-500">
                      <img
                        src={`https://wsrv.nl/?url=${encodeURIComponent(wonSkin.imagem_url)}&w=400&output=webp`}
                        alt={wonSkin.nome}
                        className="w-full h-52 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        onError={(e) => { e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192' }}
                      />
                    </div>
                    <p className="text-xs font-bold text-cs-blue uppercase tracking-[0.2em] mb-1">{wonSkin.arma}</p>
                    <p className="font-black text-2xl text-white mb-4 leading-tight">{wonSkin.nome}</p>
                    <button
                      onClick={() => onAddFavorite(wonSkin)}
                      className="px-6 py-3 bg-white text-black font-black rounded-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    >
                      ⭐ SALVAR NA COLEÇÃO
                    </button>
                  </div>
                ) : (
                  <div className="text-center relative z-10">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 mx-auto border border-white/10">
                      <p className="text-5xl animate-bounce">🎰</p>
                    </div>
                    <p className="text-cs-muted font-black uppercase tracking-widest text-sm">Gire para ganhar uma skin!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-cs-bg rounded-2xl p-6 border border-cs-border h-full">
                <h3 className="font-black text-white mb-4 uppercase text-xs tracking-widest opacity-50">Últimos Ganhos</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {history.length === 0 ? (
                    <p className="text-cs-muted text-xs font-bold py-10 text-center">Nenhum giro realizado</p>
                  ) : (
                    history.map((skin, i) => {
                      const cfg = getRaridade(skin.raridade)
                      return (
                        <div key={i} className="p-3 rounded-xl text-xs font-black flex items-center justify-between border border-white/5 bg-white/5" style={{ borderLeft: `4px solid ${cfg.color}` }}>
                          <span className="truncate mr-2">{skin.nome}</span>
                          <span style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
