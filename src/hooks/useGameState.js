import { useState, useEffect } from 'react'

export function useGameState() {
  const [favorites, setFavorites] = useState([])
  const INVENTORY_LIMIT = 30

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cs_favorites')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

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
      newFavs = [...favorites, skin]
    }
    setFavorites(newFavs)
    localStorage.setItem('cs_favorites', JSON.stringify(newFavs))
    return true
  }

  const removeSkin = (skinId) => {
    const newFavs = favorites.filter(f => f.id !== skinId)
    setFavorites(newFavs)
    localStorage.setItem('cs_favorites', JSON.stringify(newFavs))
  }

  const addSkins = (newSkins) => {
    const availableSpace = INVENTORY_LIMIT - favorites.length
    const skinsToAdd = newSkins.slice(0, availableSpace)
    const updatedFavs = [...favorites, ...skinsToAdd]
    setFavorites(updatedFavs)
    localStorage.setItem('cs_favorites', JSON.stringify(updatedFavs))
  }

  return {
    favorites,
    inventoryLimit: INVENTORY_LIMIT,
    toggleFavorite,
    removeSkin,
    addSkins
  }
}
