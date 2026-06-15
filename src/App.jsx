import { useState, useEffect, useMemo } from 'react'
import Header      from './components/Header'
import SkinsGrid   from './components/SkinsGrid'
import SkinModal   from './components/SkinModal'
import GameNav     from './components/GameNav'
import FavoritesPage from './components/FavoritesPage'
import AimTrainer  from './components/AimTrainer'
import DefuseGame  from './components/DefuseGame'
import CaseOpening from './components/CaseOpening'
import { useGameState } from './hooks/useGameState'
import { MOCK_SKINS } from './lib/utils'
import convertedSkins from './lib/skins_converted.json'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [skins, setSkins] = useState([])
  const [selectedSkin, setSelectedSkin] = useState(null)
  const [view, setView] = useState('catalog')
  const [showAimTrainer, setShowAimTrainer] = useState(false)
  const [showDefuseGame, setShowDefuseGame] = useState(false)
  const [showCaseOpening, setShowCaseOpening] = useState(false)

  const { coins, favorites, addCoins, removeCoins, toggleFavorite, isFavorite } = useGameState()

  useEffect(() => {
    try {
      if (Array.isArray(convertedSkins) && convertedSkins.length > 0) {
        setSkins(convertedSkins)
      } else {
        setSkins(MOCK_SKINS || [])
      }
    } catch (e) {
      setSkins(MOCK_SKINS || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const filteredSkins = useMemo(() => {
    if (!Array.isArray(skins)) return []
    if (!searchTerm) return skins
    
    const term = searchTerm.toLowerCase()
    return skins.filter(s => 
      (s.nome && s.nome.toLowerCase().includes(term)) || 
      (s.arma && s.arma.toLowerCase().includes(term))
    )
  }, [skins, searchTerm])

  return (
    <div className="min-h-screen bg-cs-bg text-cs-text font-body pb-32">
      <Header />

      <div className="h-14" />

      {/* Hero banner */}
      <div className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cs-blue/10 via-cs-bg to-cs-bg" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-cs-blue/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-8">
            <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md">
              ✨ Premium CS2 Skins Marketplace
            </span>
          </div>

          <h1 className="font-display font-black text-8xl sm:text-9xl lg:text-[12rem] leading-[0.85] tracking-tighter mb-12 select-none">
            <span className="block text-white opacity-90">CS:GO</span>
            <span className="text-holographic">SKINS</span>
          </h1>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-cs-blue/30 blur-2xl group-focus-within:bg-cs-blue/50 transition-all duration-700 rounded-3xl" />
            <div className="relative flex items-center bg-cs-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 focus-within:border-cs-blue/50 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="pl-5 pr-3 text-cs-blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Busque por skins lendárias..."
                className="w-full bg-transparent border-none focus:ring-0 text-xl py-4 px-2 placeholder:text-cs-muted/40 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <p className="mt-10 text-cs-muted font-body font-medium tracking-wide uppercase text-xs sm:text-sm opacity-60">
            {searchTerm ? `Encontradas ${filteredSkins.length} skins` : `Explorando ${skins.length} itens de elite`}
          </p>
        </div>
      </div>

      <main className="pb-20">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
             <div className="w-16 h-16 border-4 border-cs-blue/20 border-t-cs-blue rounded-full animate-spin mx-auto" />
          </div>
        ) : view === 'favorites' ? (
          <FavoritesPage 
            favorites={favorites} 
            onSelectSkin={setSelectedSkin}
            onRemoveFavorite={toggleFavorite}
          />
        ) : (
          <SkinsGrid 
            skins={filteredSkins} 
            title={searchTerm ? 'Busca' : 'Catálogo'} 
            onSelectSkin={setSelectedSkin}
          />
        )}
      </main>

      {selectedSkin && (
        <SkinModal 
          skin={selectedSkin} 
          onClose={() => setSelectedSkin(null)} 
        />
      )}

      {/* Mini-Games */}
      {showAimTrainer && (
        <AimTrainer 
          onClose={() => setShowAimTrainer(false)} 
          onEarnCoins={addCoins}
        />
      )}

      {showDefuseGame && (
        <DefuseGame 
          onClose={() => setShowDefuseGame(false)} 
          onEarnCoins={addCoins}
        />
      )}

      {showCaseOpening && (
        <CaseOpening 
          skins={skins}
          coins={coins}
          onClose={() => setShowCaseOpening(false)}
          onRemoveCoins={removeCoins}
          onAddFavorite={toggleFavorite}
        />
      )}

      {/* Game Navigation Bar */}
      <GameNav 
        coins={coins}
        view={view}
        onViewChange={setView}
        onOpenAimTrainer={() => setShowAimTrainer(true)}
        onOpenDefuseGame={() => setShowDefuseGame(true)}
        onOpenCaseOpening={() => setShowCaseOpening(true)}
      />

      <footer className="border-t border-white/5 py-16 text-center text-cs-muted text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2 text-sm font-bold text-cs-text uppercase tracking-widest">CS:GO Skins IA © 2026</p>
          <div className="flex justify-center gap-8 opacity-30">
            <span>Steam API</span>
            <span>Vercel Hosting</span>
            <span>Manus Dev</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
