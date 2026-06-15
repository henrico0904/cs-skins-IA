import { useState, useEffect, useMemo } from 'react'
import Header      from './components/Header'
import SkinsGrid   from './components/SkinsGrid'
import SkinModal   from './components/SkinModal'
import GameNav     from './components/GameNav'
import FavoritesPage from './components/FavoritesPage'
import CaseOpening from './components/CaseOpening'
import TradeCentral from './components/TradeCentral'
import { useGameState } from './hooks/useGameState'
import { MOCK_SKINS } from './lib/utils'
import convertedSkins from './lib/skins_converted.json'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [skins, setSkins] = useState([])
  const [selectedSkin, setSelectedSkin] = useState(null)
  const [view, setView] = useState('catalog')
  const [showCaseOpening, setShowCaseOpening] = useState(false)
  const [showTradeCentral, setShowTradeCentral] = useState(false)

  const { favorites, inventoryLimit, toggleFavorite, removeSkin, addSkins } = useGameState()

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

  const handleTradeComplete = (removedIds, wonSkin) => {
    removedIds.forEach(id => removeSkin(id))
    addSkins([wonSkin])
  }

  return (
    <div className="min-h-screen bg-cs-bg text-cs-text font-body pb-32">
      <Header />
      <div className="h-14" />

      {/* Hero banner */}
      <div className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cs-blue/10 via-cs-bg to-cs-bg" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="font-display font-black text-8xl sm:text-9xl lg:text-[12rem] leading-[0.85] tracking-tighter mb-12 select-none">
            <span className="block text-white opacity-90">CS:GO</span>
            <span className="text-holographic">SKINS</span>
          </h1>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-cs-blue/30 blur-2xl group-focus-within:bg-cs-blue/50 transition-all duration-700 rounded-3xl" />
            <div className="relative flex items-center bg-cs-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 focus-within:border-cs-blue/50 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="pl-5 pr-3 text-cs-blue">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
            onRemoveFavorite={removeSkin}
          />
        ) : (
          <SkinsGrid 
            skins={filteredSkins} 
            title={searchTerm ? 'Busca' : 'Catálogo'} 
            onSelectSkin={setSelectedSkin}
          />
        )}
      </main>

      {selectedSkin && <SkinModal skin={selectedSkin} onClose={() => setSelectedSkin(null)} />}

      {showCaseOpening && (
        <CaseOpening 
          skins={skins}
          inventoryCount={favorites.length}
          inventoryLimit={inventoryLimit}
          onClose={() => setShowCaseOpening(false)}
          onAddFavorite={toggleFavorite}
        />
      )}

      {showTradeCentral && (
        <TradeCentral 
          inventory={favorites}
          skins={skins}
          onClose={() => setShowTradeCentral(false)}
          onTradeComplete={handleTradeComplete}
        />
      )}

      <GameNav 
        inventoryCount={favorites.length}
        inventoryLimit={inventoryLimit}
        view={view}
        onViewChange={setView}
        onOpenCaseOpening={() => setShowCaseOpening(true)}
        onOpenTradeCentral={() => setShowTradeCentral(true)}
      />

      <footer className="border-t border-white/5 py-16 text-center text-cs-muted text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2 text-sm font-bold text-cs-text uppercase tracking-widest">CS:GO Skins IA © 2026</p>
        </div>
      </footer>
    </div>
  )
}
