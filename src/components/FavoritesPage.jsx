import SkinCard from './SkinCard'

export default function FavoritesPage({ favorites, onSelectSkin, onRemoveFavorite }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cs-gold to-cs-blue" />
        <div>
          <h2 className="font-display font-black text-3xl text-cs-text uppercase tracking-tighter">
            Minhas Favoritas
          </h2>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-cs-gold/10 border border-cs-gold/30">
          <span className="text-cs-gold font-bold text-sm">⭐ {favorites.length}</span>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-32 text-cs-muted font-body">
          <p className="text-6xl mb-4">⭐</p>
          <p className="text-2xl font-display font-bold mb-2">Nenhuma skin favoritada</p>
          <p className="text-sm">Clique no ícone de estrela nas skins para adicioná-las aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
          {favorites.map((skin, i) => (
            <div
              key={skin.id || i}
              className="animate-fade-in cursor-pointer relative group"
              style={{ animationDelay: `${Math.min(i * 10, 200)}ms`, opacity: 0 }}
              onClick={() => onSelectSkin && onSelectSkin(skin)}
            >
              <SkinCard skin={skin} />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveFavorite(skin.id)
                }}
                className="absolute top-2 right-2 z-20 p-2 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
