import SkinCard from './SkinCard'

export default function SkinsGrid({ skins, onDelete }) {
  if (!skins.length) {
    return (
      <div className="text-center py-20 text-cs-muted font-body">
        <p className="text-4xl mb-3">🎮</p>
        <p className="text-lg">Nenhuma skin cadastrada ainda.</p>
        <p className="text-sm mt-1">Use o formulário abaixo para adicionar a primeira.</p>
      </div>
    )
  }

  return (
    <section id="grid" className="mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-5 rounded-full bg-cs-orange inline-block" />
          <h2 className="font-display font-bold text-xl text-cs-text uppercase tracking-widest">
            Coleção Completa
          </h2>
          <span className="ml-auto text-cs-muted text-sm font-body">{skins.length} skins</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {skins.map((skin, i) => (
            <div
              key={skin.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, opacity: 0 }}
            >
              <SkinCard skin={skin} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
