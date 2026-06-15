import { useState, useEffect } from 'react'

export function useGameState() {
  const [favorites, setFavorites] = useState([])
  const INVENTORY_LIMIT = 30

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cs_favorites')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  const saveToStorage = (items) => {
    localStorage.setItem('cs_favorites', JSON.stringify(items))
  }

  const toggleFavorite = (skin) => {
    const isFav = favorites.find(f => f.id === skin.id)
    let newFavs
    if (isFav) {
      newFavs = favorites.filter(f => f.id !== skin.id)
    } else {
      if (favorites.length >= INVENTORY_LIMIT) {
        alert(`Inventário cheio! Limite de ${INVENTORY_LIMIT} itens atingido.`)
        return false
      }
      // Garantir que a skin tenha um ID único para evitar problemas no inventário
      const skinWithUniqueId = { ...skin, id: `${skin.id}-${Date.now()}` }
      newFavs = [...favorites, skinWithUniqueId]
    }
    setFavorites(newFavs)
    saveToStorage(newFavs)
    return true
  }

  const removeSkin = (skinId) => {
    const newFavs = favorites.filter(f => f.id !== skinId)
    setFavorites(newFavs)
    saveToStorage(newFavs)
  }

  // NOVA FUNÇÃO: Remove várias skins e adiciona a nova de forma ATÔMICA
  const processTrade = (idsToRemove, wonSkin) => {
    setFavorites(prev => {
      const filtered = prev.filter(s => !idsToRemove.includes(s.id))
      const skinWithUniqueId = { ...wonSkin, id: `${wonSkin.id}-${Date.now()}` }
      const updated = [...filtered, skinWithUniqueId]
      saveToStorage(updated)
      return updated
    })
  }

  return {
    favorites,
    inventoryLimit: INVENTORY_LIMIT,
    toggleFavorite,
    removeSkin,
    processTrade // Exportando a nova função atômica
  }
}
