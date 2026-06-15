import { useState, useEffect } from 'react'
import Header      from './components/Header'
import SkinsGrid   from './components/SkinsGrid'
import { MOCK_SKINS } from './lib/utils'
import convertedSkins from './lib/skins_converted.json'

// Tenta usar o Supabase; se as variáveis de ambiente não estiverem configuradas,
// cai no mock data para que o layout seja visível de imediato.
let useSkins
const hasEnv =
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY

if (hasEnv) {
  const mod = await import('./hooks/useSkins')
  useSkins = mod.useSkins
}

function useConvertedSkins() {
  const [skins, setSkins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Carrega favoritos do localStorage
    const saved = localStorage.getItem('cs_skins_favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }

    // Usa o JSON importado diretamente
    if (convertedSkins && convertedSkins.length > 0) {
      setSkins(convertedSkins)
    } else {
      setSkins(MOCK_SKINS)
    }
    setLoading(false)
  }, [])

  const toggleFavorite = (skin) => {
    setFavorites(prev => {
      const isFav = prev.find(f => f.id === skin.id)
      let newFavs
      if (isFav) {
        newFavs = prev.filter(f => f.id !== skin.id)
      } else {
        newFavs = [...prev, skin]
      }
      localStorage.setItem('cs_skins_favorites', JSON.stringify(newFavs))
      return newFavs
    })
  }

  const removeSkin = (id) => setSkins(prev => prev.filter(s => s.id !== id))
  
  return { skins, favorites, loading, error, removeSkin, toggleFavorite }
}

export default function App() {
  const [view, setView] = useState('all') // 'all' ou 'favorites'
  const hook = hasEnv ? useSkins() : useConvertedSkins()
  const { skins, favorites, loading, error, removeSkin, toggleFavorite } = hook

  const displayedSkins = view === 'all' ? skins : favorites

  return (
    <div className="min-h-screen bg-cs-bg text-cs-text font-body">
      <Header onToggleFavorites={() => setView(v => v === 'all' ? 'favorites' : 'all')} currentView={view} favoriteCount={favorites.length} />

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Hero banner - Título centralizado enorme */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cs-blue/10 via-cs-bg to-cs-bg" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-cs-blue rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cs-gold rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-cs-blue/20 border border-cs-blue/50 text-cs-blue text-xs font-bold uppercase tracking-widest">
              {view === 'all' ? '✨ Mercado Premium de Skins' : '⭐ Sua Coleção Pessoal'}
            </span>
          </div>

          <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-cs-text uppercase leading-none tracking-tighter mb-6">
            {view === 'all' ? (
              <>
                CS<span className="text-cs-blue">:</span>GO
                <br />
                <span className="bg-gradient-to-r from-cs-blue via-cs-gold to-cs-blue bg-clip-text text-transparent">
                  SKINS
                </span>
              </>
            ) : (
              <>
                MINHA
                <br />
                <span className="bg-gradient-to-r from-cs-gold via-cs-blue to-cs-gold bg-clip-text text-transparent">
                  COLEÇÃO
                </span>
              </>
            )}
          </h1>

          <p className="text-cs-muted font-body text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            {view === 'all' 
              ? 'Explore a coleção mais completa de skins de Counter-Strike 2. Descubra raridades, designs exclusivos e itens icônicos.' 
              : 'Gerencie suas skins favoritas e acompanhe sua coleção personalizada de itens do CS2.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setView('all')}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${view === 'all' ? 'bg-cs-blue text-white shadow-lg shadow-cs-blue/40' : 'bg-cs-surface border border-cs-border text-cs-muted hover:text-cs-text'}`}
            >
              Ver Todas
            </button>
            <button 
              onClick={() => setView('favorites')}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${view === 'favorites' ? 'bg-cs-gold text-cs-bg shadow-lg shadow-cs-gold/40' : 'bg-cs-surface border border-cs-border text-cs-muted hover:text-cs-text'}`}
            >
              ⭐ Favoritos ({favorites.length})
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-cs-blue/30 border-t-cs-blue rounded-full animate-spin" />
            <p className="mt-4 text-cs-muted font-body text-sm">Carregando skins incríveis…</p>
          </div>
        </div>
      )}

      {!loading && (
        <SkinsGrid 
          skins={displayedSkins} 
          onDelete={removeSkin} 
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          title={view === 'all' ? 'Todas as Skins' : 'Sua Coleção'}
        />
      )}

      <footer className="border-t border-cs-border py-12 text-center text-cs-muted text-xs font-body mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2 text-sm font-bold text-cs-text">CS Skins © {new Date().getFullYear()}</p>
          <p className="text-cs-muted/60">Dados fornecidos pela API do ByMykel | Imagens via Steam Community</p>
        </div>
      </footer>
    </div>
  )
}
