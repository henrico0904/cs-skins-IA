import { useState, useEffect } from 'react'

export function useGameState() {
  const [coins, setCoins] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0)

  // Carregar do localStorage ao montar
  useEffect(() => {
    const savedCoins = localStorage.getItem('cs_coins')
    const savedFavorites = localStorage.getItem('cs_favorites')
    const savedTotal = localStorage.getItem('cs_total_coins_earned')

    if (savedCoins) setCoins(parseInt(savedCoins))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedTotal) setTotalCoinsEarned(parseInt(savedTotal))
  }, [])

  // Salvar moedas no localStorage
  const addCoins = (amount) => {
    const newCoins = coins + amount
    setCoins(newCoins)
    setTotalCoinsEarned(totalCoinsEarned + amount)
    localStorage.setItem('cs_coins', newCoins.toString())
    localStorage.setItem('cs_total_coins_earned', (totalCoinsEarned + amount).toString())
  }

  const removeCoins = (amount) => {
    const newCoins = Math.max(0, coins - amount)
    setCoins(newCoins)
    localStorage.setItem('cs_coins', newCoins.toString())
  }

  // Gerenciar favoritos
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

  const isFavorite = (skinId) => {
    return favorites.some(f => f.id === skinId)
  }

  return {
    coins,
    favorites,
    totalCoinsEarned,
    addCoins,
    removeCoins,
    toggleFavorite,
    isFavorite,
  }
}
