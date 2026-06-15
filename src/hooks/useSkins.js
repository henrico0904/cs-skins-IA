import { useState, useEffect, useCallback } from 'react'
import { fetchSkins, insertSkin, deleteSkin } from '../lib/api'

export function useSkins() {
  const [skins,   setSkins]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSkins()
      setSkins(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addSkin = async (payload) => {
    const nova = await insertSkin(payload)
    setSkins(prev => [nova, ...prev].sort((a, b) => b.preco - a.preco))
    return nova
  }

  const removeSkin = async (id) => {
    await deleteSkin(id)
    setSkins(prev => prev.filter(s => s.id !== id))
  }

  return { skins, loading, error, refetch: load, addSkin, removeSkin }
}
