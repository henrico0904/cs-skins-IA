import SkinCard from './SkinCard'

export default function SkinsGrid({ skins = [], title = 'Skins', onSelectSkin }) {
  const safeSkins = Array.isArray(skins) ? skins : []

  if (safeSkins.length === 0) {
    return (
      <div className="text-center py-20 text-cs-muted font-body">
        <p className="text-6xl mb-4 opacity-20">🔍</p>
        <p className="text-xl font-display font-bold mb-1">Nenhuma skin encontrada</p>
        <p className="text-sm opacity-60">Tente ajustar sua pesquisa ou explore outras categorias.</p>
      </div>
    )
  }

  return (
    <section id="grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cs-blue to-cs-gold" />
        <div>
          <h2 className="font-display font-black text-3xl text-cs-text uppercase tracking-tighter">
            {title}
          </h2>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-cs-blue/10 border border-cs-blue/30">
          <span className="text-cs-blue font-bold text-sm">{safeSkins.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
        {safeSkins.map((skin, i) => (
          <div
            key={skin.id || i}
            className="animate-fade-in cursor-pointer"
            style={{ animationDelay: `${Math.min(i * 10, 200)}ms`, opacity: 0 }}
            onClick={() => onSelectSkin && onSelectSkin(skin)}
          >
            <SkinCard skin={skin} />
          </div>
        ))}
      </div>
    </section>
  )
}
