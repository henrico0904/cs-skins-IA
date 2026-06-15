import { useState, useEffect } from 'react'
import Header      from './components/Header'
import Carousel    from './components/Carousel'
import SkinsGrid   from './components/SkinsGrid'
import AddSkinForm from './components/AddSkinForm'
import { MOCK_SKINS } from './lib/utils'

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

function useMockSkins() {
  const [skins, setSkins] = useState(MOCK_SKINS)
  const addSkin = (payload) => {
    const nova = { ...payload, id: String(Date.now()) }
    setSkins(prev => [nova, ...prev].sort((a, b) => b.preco - a.preco))
    return nova
  }
  const removeSkin = (id) => setSkins(prev => prev.filter(s => s.id !== id))
  return { skins, loading: false, error: null, addSkin, removeSkin }
}

export default function App() {
  const hook = hasEnv ? useSkins() : useMockSkins()
  const { skins, loading, error, addSkin, removeSkin } = hook

  return (
    <div className="min-h-screen bg-cs-bg text-cs-text font-body">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Hero banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-6">
        <p className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-cs-orange mb-3">
          Mercado de skins
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-cs-text uppercase leading-none tracking-tight">
          As Melhores<br />
          <span className="text-cs-orange">Skins do CS2</span>
        </h1>
        <p className="mt-4 text-cs-muted font-body text-sm max-w-md">
          Explore e gerencie a coleção de skins mais valiosas do Counter-Strike 2.
          {!hasEnv && (
            <span className="ml-1 text-yellow-400">
              (modo demo — configure o Supabase para persistir dados)
            </span>
          )}
        </p>
      </div>

      {/* States */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-cs-muted font-body text-sm">
          Carregando skins…
        </div>
      )}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4 text-red-400 text-sm font-body">
            <strong>Erro ao conectar ao Supabase:</strong> {error}
          </div>
        </div>
      )}

      {!loading && (
        <>
          <Carousel skins={skins} />
          <SkinsGrid skins={skins} onDelete={removeSkin} />
          <AddSkinForm onAdd={addSkin} />
        </>
      )}

      <footer className="border-t border-cs-border py-8 text-center text-cs-muted text-xs font-body">
        CS Skins © {new Date().getFullYear()} — Feito com React + Supabase
      </footer>
    </div>
  )
}
