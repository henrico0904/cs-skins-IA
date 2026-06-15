import { useState, useEffect } from 'react'

export function useGameState() {
  const [favorites, setFavorites] = useState([])
  const [spinsLeft, setSpinsLeft] = useState(20)
  const [lastSpinDate, setLastSpinDate] = useState('')

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cs_favorites')
    const savedSpins = localStorage.getItem('cs_spins_left')
    const savedDate = localStorage.getItem('cs_last_spin_date')
    
    const today = new Date().toLocaleDateString()

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    
    // Lógica de reset diário
    if (savedDate !== today) {
      setSpinsLeft(20)
      setLastSpinDate(today)
      localStorage.setItem('cs_spins_left', '20')
      localStorage.setItem('cs_last_spin_date', today)
    } else if (savedSpins) {
      setSpinsLeft(parseInt(savedSpins))
      setLastSpinDate(savedDate)
    }
  }, [])

  const toggleFavorite = (skin) => {
    const isFav = favorites.find(f => f.id === skin.id)
    let newFavs
    if (isFav) {
      newFavs = favorites.filter(f => f.id !== skin.id)
    } else {
      newFavs = [...favorites, skin]
    }
    setFavorites(newFavs)
    localStorage.setItem('cs_favorites', JSON.stringify(newFavs))
  }

  const useSpin = () => {
    if (spinsLeft > 0) {
      const newSpins = spinsLeft - 1
      setSpinsLeft(newSpins)
      localStorage.setItem('cs_spins_left', newSpins.toString())
      return true
    }
    return false
  }

  return {
    favorites,
    spinsLeft,
    toggleFavorite,
    useSpin,
  }
}
