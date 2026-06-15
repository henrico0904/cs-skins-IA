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

  const { favorites, inventoryLimit, toggleFavorite, removeSkin, processTrade } = useGameState()

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
        
        <div className="relative max-w-[95vw] mx-auto text-center flex flex-col items-center">
          <div className="inline-block mb-12">
            <span className="px-8 py-2 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.5em] backdrop-blur-md bg-white/5">
              Premium CS2 Asset Database
            </span>
          </div>

          {/* Título ocupando 75% da largura da div pai */}
          <div className="w-full flex justify-center mb-16">
            <h1 className="w-3/4 font-display font-black text-[12vw] leading-[0.8] tracking-tighter select-none">
              <span className="block text-white/90">CS:GO</span>
              <span className="text-holographic block">SKINS</span>
            </h1>
          </div>

          <div className="w-full max-w-3xl relative group">
            <div className="absolute inset-0 bg-cs-blue/20 blur-3xl group-focus-within:bg-cs-blue/40 transition-all duration-700" />
            <div className="relative flex items-center bg-cs-surface border border-white/10 p-2 focus-within:border-cs-blue/50 transition-all duration-500 shadow-2xl">
              <div className="pl-6 pr-4 text-cs-blue">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="LOCALIZAR SKIN NO BANCO DE DADOS..."
                className="w-full bg-transparent border-none focus:ring-0 text-lg py-5 px-2 placeholder:text-cs-muted/30 font-black uppercase tracking-widest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <p className="mt-12 text-cs-muted font-black uppercase tracking-[0.3em] text-[10px] opacity-40">
            {searchTerm ? `RESULTADOS: ${filteredSkins.length}` : `DATABASE: ${skins.length} ASSETS`}
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
            onRemoveFavorite={removeSkin}
          />
        ) : (
          <SkinsGrid 
            skins={filteredSkins} 
            title={searchTerm ? 'Resultados' : 'Database'} 
            onSelectSkin={setSelectedSkin}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
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
          onTradeComplete={processTrade}
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
    </div>
  )
}
