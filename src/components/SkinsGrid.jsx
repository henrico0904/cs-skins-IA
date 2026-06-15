import SkinCard from './SkinCard'

export default function SkinsGrid({ skins, onDelete }) {
  if (!skins.length) {
    return (
      <div className="text-center py-32 text-cs-muted font-body">
        <p className="text-6xl mb-4">🎮</p>
        <p className="text-2xl font-display font-bold mb-2">Nenhuma skin disponível</p>
        <p className="text-sm">Tente novamente mais tarde.</p>
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
                Todas as Skins
              </h2>
              <p className="text-cs-muted text-sm font-body mt-1">Coleção completa de Counter-Strike 2</p>
            </div>
          </div>
          <div className="ml-auto">
            <div className="px-4 py-2 rounded-lg bg-cs-blue/20 border border-cs-blue/50">
              <span className="text-cs-gold font-display font-bold text-lg">{skins.length}</span>
              <span className="text-cs-muted text-sm font-body ml-2">skins</span>
            </div>
          </div>
        </div>

        {/* Grid responsivo com mais colunas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5">
          {skins.map((skin, i) => (
            <div
              key={skin.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 30, 600)}ms`, opacity: 0 }}
            >
              <SkinCard skin={skin} onDelete={onDelete} compact={false} />
            </div>
          ))}
        </div>

        {/* Mensagem de rodapé */}
        <div className="mt-16 pt-12 border-t border-cs-border/30 text-center">
          <p className="text-cs-muted text-sm font-body">
            Carregou todas as {skins.length} skins? Incrível! 🚀
          </p>
        </div>
      </div>
    </section>
  )
}
