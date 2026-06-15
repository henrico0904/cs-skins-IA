import { useState } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function CaseOpening({ skins, coins, onClose, onRemoveCoins, onAddFavorite }) {
  const CASE_COST = 50
  const [spinning, setSpinning] = useState(false)
  const [wonSkin, setWonSkin] = useState(null)
  const [history, setHistory] = useState([])

  // Gerar pesos de raridade
  const getRandomSkin = () => {
    const rand = Math.random()
    let selected

    if (rand < 0.60) {
      // 60% Normal (Branco)
      selected = skins.filter(s => {
        const cfg = getRaridade(s.raridade)
        return cfg.label === 'Normal'
      })
    } else if (rand < 0.90) {
      // 30% Épico (Roxo)
      selected = skins.filter(s => {
        const cfg = getRaridade(s.raridade)
        return cfg.label === 'Épica'
      })
    } else {
      // 10% Raro (Dourado)
      selected = skins.filter(s => {
        const cfg = getRaridade(s.raridade)
        return cfg.label === 'Rara'
      })
    }

    return selected[Math.floor(Math.random() * selected.length)]
  }

  const openCase = () => {
    if (coins < CASE_COST || spinning) return

    setSpinning(true)
    onRemoveCoins(CASE_COST)

    // Animação de rolagem
    setTimeout(() => {
      const skin = getRandomSkin()
      setWonSkin(skin)
      setHistory(prev => [skin, ...prev].slice(0, 10))
      setSpinning(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-cs-bg/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-cs-surface border border-cs-border rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-black text-white">🎰 ROLETA DE SKINS</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg">✕</button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Info */}
            <div className="lg:col-span-1">
              <div className="bg-cs-bg rounded-2xl p-6 space-y-4 border border-cs-border">
                <div>
                  <p className="text-cs-muted text-sm uppercase font-bold">Seu Saldo</p>
                  <p className="text-4xl font-black text-cs-gold">{coins}</p>
                </div>
                <div>
                  <p className="text-cs-muted text-sm uppercase font-bold">Custo por Abertura</p>
                  <p className="text-2xl font-black text-red-500">{CASE_COST}</p>
                </div>
                <button
                  onClick={openCase}
                  disabled={coins < CASE_COST || spinning}
                  className={`w-full py-4 font-black text-lg rounded-2xl transition-all transform ${
                    coins >= CASE_COST && !spinning
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 cursor-pointer'
                      : 'bg-cs-border text-cs-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  {spinning ? 'ABRINDO...' : 'ABRIR CASE'}
                </button>
              </div>
            </div>

            {/* Center - Roulette */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-600/30 flex flex-col items-center justify-center min-h-96">
                {wonSkin ? (
                  <div className="text-center w-full">
                    <div className={`mb-4 transform transition-all ${spinning ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
                      <img
                        src={`https://wsrv.nl/?url=${encodeURIComponent(wonSkin.imagem_url)}&w=300&output=webp`}
                        alt={wonSkin.nome}
                        className="w-full h-48 object-contain drop-shadow-2xl"
                        onError={(e) => {
                          e.target.src = 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//330x192'
                        }}
                      />
                    </div>
                    <p className="font-black text-lg text-white">{wonSkin.nome}</p>
                    <p className="text-cs-muted text-sm">{wonSkin.arma}</p>
                    <p className="text-cs-blue font-black mt-2">{formatPrice(wonSkin.preco)}</p>
                    <button
                      onClick={() => onAddFavorite(wonSkin)}
                      className="mt-4 px-4 py-2 bg-cs-gold text-cs-bg font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                      ⭐ Adicionar aos Favoritos
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-6xl mb-4 animate-spin">🎰</p>
                    <p className="text-cs-muted font-bold">Abra um case para começar!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right - History */}
            <div className="lg:col-span-1">
              <div className="bg-cs-bg rounded-2xl p-6 border border-cs-border">
                <h3 className="font-black text-white mb-4 uppercase text-sm">Histórico</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-cs-muted text-sm">Nenhuma abertura ainda</p>
                  ) : (
                    history.map((skin, i) => {
                      const cfg = getRaridade(skin.raridade)
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-lg text-sm font-bold truncate"
                          style={{
                            backgroundColor: `${cfg.color}22`,
                            color: cfg.color,
                            borderLeft: `3px solid ${cfg.color}`,
                          }}
                        >
                          {skin.nome}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Odds */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-white font-bold mb-2">⚪ Normal</p>
              <p className="text-2xl font-black text-white">60%</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-600/30 text-center">
              <p className="text-purple-400 font-bold mb-2">🟣 Épico</p>
              <p className="text-2xl font-black text-purple-400">30%</p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-600/10 border border-yellow-600/30 text-center">
              <p className="text-yellow-400 font-bold mb-2">🟡 Raro</p>
              <p className="text-2xl font-black text-yellow-400">10%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
