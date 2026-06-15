import { useState, useEffect } from 'react'

export default function DefuseGame({ onClose, onEarnCoins }) {
  const [wires, setWires] = useState([])
  const [timeLeft, setTimeLeft] = useState(40)
  const [gameActive, setGameActive] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [correctCuts, setCorrectCuts] = useState(0)
  const [totalWires, setTotalWires] = useState(0)

  const colors = ['#FF0000', '#0066FF', '#FFD700', '#00FF00', '#A335EE']

  const startGame = () => {
    const wireCount = 5
    setTotalWires(wireCount)
    const correctWire = Math.floor(Math.random() * wireCount)
    
    const newWires = Array.from({ length: wireCount }, (_, i) => ({
      id: i,
      color: colors[i],
      isCorrect: i === correctWire,
      cut: false,
    }))
    
    setWires(newWires)
    setGameStarted(true)
    setCorrectCuts(0)
    setTimeLeft(40)
    setGameActive(true)
  }

  useEffect(() => {
    if (!gameActive || !gameStarted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, gameStarted])

  const handleCutWire = (id) => {
    if (!gameActive) return

    const wire = wires.find(w => w.id === id)
    if (!wire) return

    if (wire.isCorrect) {
      setCorrectCuts(prev => prev + 1)
      setWires(prev =>
        prev.map(w =>
          w.id === id ? { ...w, cut: true } : w
        )
      )

      // Se cortou o fio certo, gera novo desafio
      setTimeout(() => {
        const newCorrectWire = Math.floor(Math.random() * totalWires)
        setWires(prev =>
          prev.map((w, i) => ({
            ...w,
            isCorrect: i === newCorrectWire,
            cut: false,
          }))
        )
      }, 500)
    } else {
      // Cortou o fio errado - game over
      setGameActive(false)
      const coinsWon = Math.max(correctCuts * 10, 5)
      onEarnCoins(coinsWon)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-cs-bg/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-cs-surface border border-cs-border rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-black text-white">💣 DEFUSE THE BOMB</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg">✕</button>
        </div>

        {/* Game Area */}
        <div className="p-8">
          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-cs-text mb-4">Desative a Bomba!</p>
              <p className="text-cs-muted mb-8">Corte os fios certos para desativar a bomba. Um fio errado e você perde!</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-black rounded-2xl hover:scale-105 transition-transform"
              >
                COMEÇAR JOGO
              </button>
            </div>
          ) : (
            <div>
              {/* Stats */}
              <div className="flex justify-between mb-8 p-4 bg-cs-bg rounded-xl">
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Fios Cortados</p>
                  <p className="text-4xl font-black text-green-400">{correctCuts}</p>
                </div>
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Tempo</p>
                  <p className={`text-4xl font-black ${timeLeft > 15 ? 'text-cs-gold' : 'text-red-500 animate-pulse'}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Moedas</p>
                  <p className="text-4xl font-black text-green-400">{Math.max(correctCuts * 10, 5)}</p>
                </div>
              </div>

              {/* Bomb */}
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 bg-red-600/20 border-4 border-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <p className="text-4xl">💣</p>
                </div>
              </div>

              {/* Wires */}
              <div className="space-y-4">
                {wires.map(wire => (
                  <button
                    key={wire.id}
                    onClick={() => handleCutWire(wire.id)}
                    disabled={wire.cut || !gameActive}
                    className={`w-full p-6 rounded-2xl font-bold text-lg transition-all transform ${
                      wire.cut
                        ? 'opacity-50 scale-95 line-through'
                        : 'hover:scale-105 hover:shadow-lg'
                    }`}
                    style={{
                      backgroundColor: `${wire.color}22`,
                      borderLeft: `6px solid ${wire.color}`,
                      color: wire.color,
                    }}
                  >
                    {wire.cut ? '✓ CORTADO' : 'CORTAR ESTE FIO'}
                  </button>
                ))}
              </div>

              {!gameActive && (
                <div className="mt-6 p-6 bg-red-600/10 rounded-2xl text-center border border-red-600/30">
                  <p className="text-2xl font-black text-white mb-2">
                    {correctCuts > 0 ? '✓ Bomba Desativada!' : '✗ Bomba Explodiu!'}
                  </p>
                  <p className="text-lg text-cs-gold mb-4">Você ganhou {Math.max(correctCuts * 10, 5)} moedas!</p>
                  <button
                    onClick={() => setGameStarted(false)}
                    className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                  >
                    Jogar Novamente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
