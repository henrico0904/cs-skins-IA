import { useState } from 'react'
import { getRaridade, formatPrice } from '../lib/utils'

export default function TradeCentral({ inventory, skins, onClose, onTradeComplete }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [trading, setTrading] = useState(false)
  const [resultSkin, setResultSkin] = useState(null)

  const toggleSelect = (id) => {
    if (resultSkin) return // Impede seleção se já houver resultado
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id))
    } else if (selectedIds.length < 5) {
      setSelectedIds(prev => [...prev, id])
    }
  }

  const handleTrade = () => {
    if (selectedIds.length !== 5) return
    
    setTrading(true)
    
    const selectedSkins = inventory.filter(s => selectedIds.includes(s.id))
    const firstRarity = selectedSkins[0].raridade
    
    const rarityOrder = ['Consumível', 'Industrial', 'Mil-spec', 'Restrita', 'Classificada', 'Secreta', 'Contrabandeada']
    const currentIndex = rarityOrder.indexOf(firstRarity)
    const nextRarity = currentIndex < rarityOrder.length - 1 ? rarityOrder[currentIndex + 1] : rarityOrder[currentIndex]

    const pool = skins.filter(s => s.raridade === nextRarity)
    const won = pool[Math.floor(Math.random() * pool.length)] || skins[0]

    setTimeout(() => {
      setResultSkin(won)
      onTradeComplete(selectedIds, won) // Aqui as skins somem do inventário global
      setTrading(false)
    }, 2000)
  }

  const resetContract = () => {
    setResultSkin(null)
    setSelectedIds([])
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-cs-surface border border-white/10 w-full max-w-6xl shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in flex flex-col max-h-[90vh]">
        <div className="bg-white/5 border-b border-white/10 p-6 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-cs-gold" />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Contrato de Troca</h2>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
        </div>

        <div className="p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[10px] font-black text-cs-muted uppercase tracking-[0.3em]">Inventário Disponível ({inventory.length}/30)</h3>
                <p className="text-[10px] font-black text-cs-gold uppercase tracking-widest">Selecione 5 itens para o upgrade</p>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {inventory.map(skin => {
                  const cfg = getRaridade(skin.raridade)
                  const isSelected = selectedIds.includes(skin.id)
                  return (
                    <div 
                      key={skin.id}
                      onClick={() => toggleSelect(skin.id)}
                      className={`relative aspect-square border cursor-pointer transition-all p-2 group ${
                        isSelected ? 'border-cs-gold bg-cs-gold/10' : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <img src={`https://wsrv.nl/?url=${encodeURIComponent(skin.imagem_url)}&w=150&output=webp`} className="w-full h-full object-contain" alt="" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: cfg.color }} />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-black/40 border border-white/5 p-8 flex-1 flex flex-col">
                <div className="mb-10 text-center">
                  <p className="text-[10px] font-black text-cs-muted uppercase tracking-[0.4em] mb-2">Contrato Ativo</p>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-8 h-1 ${i < selectedIds.length ? 'bg-cs-gold' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                {resultSkin ? (
                  <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-48 h-48 mb-6 relative">
                      <div className="absolute inset-0 bg-cs-gold/20 blur-[60px] animate-pulse" />
                      <img src={`https://wsrv.nl/?url=${encodeURIComponent(resultSkin.imagem_url)}&w=300&output=webp`} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" alt="" />
                    </div>
                    <p className="text-cs-gold text-[10px] font-black uppercase tracking-widest mb-1">UPGRADE CONCLUÍDO</p>
                    <h4 className="text-2xl font-black text-white uppercase text-center">{resultSkin.nome}</h4>
                    <button 
                      onClick={resetContract}
                      className="mt-8 px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-cs-blue hover:text-white transition-all"
                    >
                      Novo Contrato
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 border border-dashed border-white/10 flex items-center justify-center mb-6 opacity-20">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1" /></svg>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-widest mb-2">Aguardando Itens</p>
                    <p className="text-[10px] text-cs-muted uppercase tracking-widest max-w-[200px]">Selecione 5 itens para processar o upgrade de raridade</p>
                  </div>
                )}

                {!resultSkin && (
                  <button
                    disabled={selectedIds.length !== 5 || trading}
                    onClick={handleTrade}
                    className={`mt-10 w-full py-6 font-black text-xs uppercase tracking-[0.5em] transition-all ${
                      selectedIds.length === 5 && !trading
                        ? 'bg-cs-gold text-black hover:bg-yellow-500'
                        : 'bg-white/5 text-cs-muted cursor-not-allowed'
                    }`}
                  >
                    {trading ? 'PROCESSANDO...' : 'ASSINAR CONTRATO'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
