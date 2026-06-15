import { useState, useEffect } from 'react'
import Header      from './components/Header'
import SkinsGrid   from './components/SkinsGrid'
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

function useConvertedSkins() {
  const [skins, setSkins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSkins = async () => {
      try {
        // Tenta carregar o JSON convertido
        const response = await fetch('/src/lib/skins_converted.json')
        if (response.ok) {
          const data = await response.json()
          setSkins(data)
        } else {
          // Fallback para mock data
          setSkins(MOCK_SKINS)
        }
      } catch (err) {
        console.warn('Usando mock data:', err)
        setSkins(MOCK_SKINS)
      } finally {
        setLoading(false)
      }
    }
    loadSkins()
  }, [])

  const addSkin = (payload) => {
    const nova = { ...payload, id: String(Date.now()) }
    setSkins(prev => [nova, ...prev].sort((a, b) => b.preco - a.preco))
    return nova
  }
  const removeSkin = (id) => setSkins(prev => prev.filter(s => s.id !== id))
  return { skins, loading, error, addSkin, removeSkin }
}

export default function App() {
  const hook = hasEnv ? useSkins() : useConvertedSkins()
  const { skins, loading, error, addSkin, removeSkin } = hook

  return (
    <div className="min-h-screen bg-cs-bg text-cs-text font-body">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Hero banner - Título centralizado enorme */}
      <div className="relative py-24 px-4 overflow-hidden">
        {/* Fundo com gradiente e efeito */}
        <div className="absolute inset-0 bg-gradient-to-b from-cs-blue/10 via-cs-bg to-cs-bg" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cs-blue rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cs-gold rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Conteúdo */}
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-cs-blue/20 border border-cs-blue/50 text-cs-blue text-xs font-semibold uppercase tracking-widest">
              ✨ Mercado Premium de Skins
            </span>
          </div>

          <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-cs-text uppercase leading-none tracking-tighter mb-6">
            CS<span className="text-cs-blue">:</span>GO
            <br />
            <span className="bg-gradient-to-r from-cs-blue via-cs-gold to-cs-blue bg-clip-text text-transparent">
              SKINS
            </span>
          </h1>

          <p className="text-cs-muted font-body text-lg sm:text-xl max-w-2xl mx-auto mb-4">
            Explore a coleção mais completa de skins de Counter-Strike 2. Descubra raridades, designs exclusivos e itens icônicos do jogo.
          </p>

          <div className="flex items-center justify-center gap-2 text-cs-gold text-sm font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-cs-gold animate-pulse" />
            {skins.length} skins disponíveis
            <span className="inline-block w-2 h-2 rounded-full bg-cs-gold animate-pulse" />
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
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4 text-red-400 text-sm font-body">
            <strong>Erro ao conectar:</strong> {error}
          </div>
        </div>
      )}

      {!loading && (
        <>
          <SkinsGrid skins={skins} onDelete={removeSkin} />
        </>
      )}

      <footer className="border-t border-cs-border py-12 text-center text-cs-muted text-xs font-body mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2">CS Skins © {new Date().getFullYear()} — Feito com React + Vite</p>
          <p className="text-cs-muted/60">Dados fornecidos pela API do ByMykel | Imagens do Steam</p>
        </div>
      </footer>
    </div>
  )
}
