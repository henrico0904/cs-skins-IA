import SkinCard from './SkinCard'

export default function FavoritesPage({ favorites, onSelectSkin, onRemoveFavorite }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
        <div className="w-2 h-10 bg-cs-gold" />
        <div>
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tighter">
            Coleção Pessoal
          </h2>
          <p className="text-[10px] text-cs-muted font-black uppercase tracking-[0.4em] mt-2">Inventário Sincronizado</p>
        </div>
        <div className="ml-auto px-6 py-3 border border-white/10 bg-white/5">
          <span className="text-cs-gold font-black text-xl tracking-tighter">{favorites.length.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-cs-muted font-black uppercase tracking-widest ml-3">Itens</span>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-40 border border-dashed border-white/10">
          <svg className="w-16 h-16 mx-auto mb-6 text-cs-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-xl font-black text-white uppercase tracking-widest mb-2">Inventário Vazio</p>
          <p className="text-xs text-cs-muted uppercase tracking-widest">Selecione itens no catálogo para popular sua coleção</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
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
                className="absolute top-3 right-3 z-30 p-2 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
