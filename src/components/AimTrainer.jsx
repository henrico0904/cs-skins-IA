import { useState, useEffect } from 'react'

export default function AimTrainer({ onClose, onEarnCoins }) {
  const [targets, setTargets] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  // Gerar alvos aleatórios
  const generateTargets = () => {
    const newTargets = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      hit: false,
    }))
    setTargets(newTargets)
  }

  // Iniciar jogo
  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    generateTargets()
  }

  // Timer
  useEffect(() => {
    if (!gameActive || !gameStarted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          const coinsWon = Math.floor(score * 0.5)
          onEarnCoins(coinsWon)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, gameStarted, score, onEarnCoins])

  const handleTargetClick = (id) => {
    if (!gameActive) return
    
    setTargets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, hit: true } : t
      )
    )
    setScore(prev => prev + 1)

    // Gerar novos alvos após um delay
    setTimeout(() => {
      generateTargets()
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-cs-bg/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-cs-surface border border-cs-border rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cs-blue to-cs-gold p-6 flex justify-between items-center">
          <h2 className="text-3xl font-black text-white">🎯 AIM TRAINER</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg">✕</button>
        </div>

        {/* Game Area */}
        <div className="p-8">
          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-cs-text mb-4">Teste sua Precisão!</p>
              <p className="text-cs-muted mb-8">Clique nos alvos o máximo que conseguir em 30 segundos</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cs-blue to-cs-gold text-white font-black rounded-2xl hover:scale-105 transition-transform"
              >
                COMEÇAR JOGO
              </button>
            </div>
          ) : (
            <div>
              {/* Stats */}
              <div className="flex justify-between mb-6 p-4 bg-cs-bg rounded-xl">
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Pontuação</p>
                  <p className="text-4xl font-black text-cs-blue">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Tempo</p>
                  <p className={`text-4xl font-black ${timeLeft > 10 ? 'text-cs-gold' : 'text-red-500'}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-cs-muted text-sm">Moedas</p>
                  <p className="text-4xl font-black text-green-400">{Math.floor(score * 0.5)}</p>
                </div>
              </div>

              {/* Game Field */}
              <div className="relative w-full h-96 bg-gradient-to-b from-cs-blue/10 to-cs-bg rounded-2xl overflow-hidden border border-cs-border">
                {targets.map(target => (
                  <button
                    key={target.id}
                    onClick={() => handleTargetClick(target.id)}
                    className={`absolute w-12 h-12 rounded-full border-4 border-cs-blue transition-all transform ${
                      target.hit
                        ? 'scale-150 opacity-0 bg-green-500/50'
                        : 'hover:scale-110 bg-cs-blue/20 hover:bg-cs-blue/50 cursor-crosshair'
                    }`}
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>

              {!gameActive && (
                <div className="mt-6 p-6 bg-cs-blue/10 rounded-2xl text-center border border-cs-blue/30">
                  <p className="text-2xl font-black text-white mb-2">Jogo Finalizado!</p>
                  <p className="text-lg text-cs-gold mb-4">Você ganhou {Math.floor(score * 0.5)} moedas!</p>
                  <button
                    onClick={() => {
                      setGameStarted(false)
                      setScore(0)
                    }}
                    className="px-6 py-2 bg-cs-blue text-white font-bold rounded-lg hover:bg-cs-blue/80"
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
