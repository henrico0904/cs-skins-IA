import SkinCard from './SkinCard'

export default function SkinsGrid({ skins, onDelete, onToggleFavorite, favorites, title }) {
  if (!skins.length) {
    return (
      <div className="text-center py-32 text-cs-muted font-body">
        <p className="text-6xl mb-4">⭐</p>
        <p className="text-2xl font-display font-bold mb-2">Sua coleção está vazia</p>
        <p className="text-sm">Clique na estrela das skins para adicioná-las aqui.</p>
      </div>
    )
  }

  return (
    <section id="grid" className="mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção header com título e contador */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cs-blue to-cs-gold" />
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-cs-text uppercase tracking-tighter">
                {title}
              </h2>
              <p className="text-cs-muted text-sm font-body mt-1">
                {title === 'Todas as Skins' ? 'Coleção completa de Counter-Strike 2' : 'Sua seleção personalizada de itens'}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <div className="px-4 py-2 rounded-lg bg-cs-blue/20 border border-cs-blue/50">
              <span className="text-cs-gold font-display font-bold text-lg">{skins.length}</span>
              <span className="text-cs-muted text-sm font-body ml-2">skins</span>
            </div>
          </div>
        </div>

        {/* Grid responsivo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5">
          {skins.map((skin, i) => (
            <div
              key={skin.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 20, 400)}ms`, opacity: 0 }}
            >
              <SkinCard 
                skin={skin} 
                onDelete={onDelete} 
                onToggleFavorite={onToggleFavorite}
                isFavorite={!!favorites.find(f => f.id === skin.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
