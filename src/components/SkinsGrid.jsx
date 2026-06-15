import SkinCard from './SkinCard'

export default function SkinsGrid({ skins = [], title = 'Skins', onSelectSkin, onToggleFavorite, favorites = [] }) {
  const safeSkins = Array.isArray(skins) ? skins : []

  if (safeSkins.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-cs-muted font-black uppercase tracking-[0.5em] text-xs">Nenhum asset localizado no banco de dados</p>
      </div>
    )
  }

  return (
    <section id="grid" className="max-w-[1600px] mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-1 h-8 bg-cs-blue" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
          {title} <span className="text-cs-blue ml-2 opacity-50">[{safeSkins.length}]</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {safeSkins.map((skin, i) => (
          <div
            key={skin.id || i}
            className="animate-fade-in"
            style={{ animationDelay: `${Math.min(i * 10, 200)}ms` }}
            onClick={() => onSelectSkin && onSelectSkin(skin)}
          >
            <SkinCard 
              skin={skin} 
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.some(f => f.id === skin.id || f.id.startsWith(skin.id))}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
