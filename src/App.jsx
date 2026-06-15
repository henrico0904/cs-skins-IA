import { useState, useEffect, useMemo } from 'react'
import Header      from './components/Header'
import SkinsGrid   from './components/SkinsGrid'
import { MOCK_SKINS } from './lib/utils'
import convertedSkins from './lib/skins_converted.json'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [skins, setSkins] = useState([])

  useEffect(() => {
    // Carregamento ultra-seguro
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

  // Filtro de pesquisa performático
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
    <div className="min-h-screen bg-cs-bg text-cs-text font-body">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Hero banner moderno com Busca */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cs-blue/10 via-cs-bg to-cs-bg" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-cs-blue rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cs-gold rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-cs-blue/20 border border-cs-blue/50 text-cs-blue text-xs font-bold uppercase tracking-widest">
              ✨ Mercado Premium de Skins
            </span>
          </div>

          <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-cs-text uppercase leading-none tracking-tighter mb-8">
            CS<span className="text-cs-blue">:</span>GO
            <br />
            <span className="bg-gradient-to-r from-cs-blue via-cs-gold to-cs-blue bg-clip-text text-transparent">
              SKINS
            </span>
          </h1>

          {/* Barra de Busca Gigante */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-cs-blue/20 blur-xl group-hover:bg-cs-blue/30 transition-all duration-500 rounded-2xl" />
            <div className="relative flex items-center bg-cs-surface border border-cs-border rounded-2xl p-2 focus-within:border-cs-blue transition-all duration-300">
              <div className="pl-4 pr-2 text-cs-muted">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou arma (ex: AWP, Dragon Lore...)"
                className="w-full bg-transparent border-none focus:ring-0 text-lg py-3 px-2 placeholder:text-cs-muted/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="p-2 mr-2 hover:bg-cs-bg rounded-lg text-cs-muted hover:text-cs-text"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <p className="mt-8 text-cs-muted font-body text-sm sm:text-base">
            {searchTerm ? `Encontradas ${filteredSkins.length} skins para sua busca` : `${skins.length} skins disponíveis no catálogo`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-cs-blue/30 border-t-cs-blue rounded-full animate-spin" />
              <p className="mt-4 text-cs-muted font-body text-sm">Sincronizando inventário…</p>
            </div>
          </div>
        ) : (
          <SkinsGrid 
            skins={filteredSkins} 
            title={searchTerm ? 'Resultado da Busca' : 'Todas as Skins'} 
          />
        )}
      </main>

      <footer className="border-t border-cs-border py-12 text-center text-cs-muted text-xs font-body">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2 text-sm font-bold text-cs-text uppercase tracking-widest">CS:GO Skins Marketplace</p>
          <p className="text-cs-muted/60">Imagens via Steam Community | API by ByMykel</p>
        </div>
      </footer>
    </div>
  )
}
