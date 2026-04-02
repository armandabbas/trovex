import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { WatchlistRow, WatchlistInsert, WatchlistUpdate, PriceAlertRow, PriceAlertInsert } from '../types/database'

export function useWatchlist() {
  const { user } = useAuth()
  const [items, setItems] = useState<WatchlistRow[]>([])
  const [alerts, setAlerts] = useState<PriceAlertRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWatchlist = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error: err } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (err) throw err
      setItems(data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Watchlist.')
    } finally {
      setLoading(false)
    }
  }, [user])

  const fetchAlerts = useCallback(async () => {
    if (!user) return
    const { data } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setAlerts(data ?? [])
  }, [user])

  useEffect(() => {
    fetchWatchlist()
    fetchAlerts()
  }, [fetchWatchlist, fetchAlerts])

  async function addWatchlistItem(item: Omit<WatchlistInsert, 'user_id'>): Promise<void> {
    if (!user) throw new Error('Nicht angemeldet.')
    const { error } = await supabase.from('watchlist').insert({ ...item, user_id: user.id } as any)
    if (error) throw new Error(`Watchlist-Eintrag fehlgeschlagen: ${error.message}`)
    await fetchWatchlist()
  }

  async function updateWatchlistItem(id: string, updates: WatchlistUpdate): Promise<void> { // @ts-ignore
    const { error } = await supabase.from('watchlist').update(updates as any).eq('id', id)
    if (error) throw new Error(`Update fehlgeschlagen: ${error.message}`)
    await fetchWatchlist()
  }

  async function deleteWatchlistItem(id: string): Promise<void> {
    const { error } = await supabase.from('watchlist').delete().eq('id', id)
    if (error) throw new Error(`Löschen fehlgeschlagen: ${error.message}`)
    setItems((prev: WatchlistRow[]) => prev.filter((i) => i.id !== id))
  }

  async function addAlert(alert: Omit<PriceAlertInsert, 'user_id'>): Promise<void> {
    if (!user) throw new Error('Nicht angemeldet.')
    const { error } = await supabase.from('price_alerts').insert({ ...alert, user_id: user.id } as any)
    if (error) throw new Error(`Alert konnte nicht erstellt werden: ${error.message}`)
    await fetchAlerts()
  }

  async function deleteAlert(id: string): Promise<void> {
    const { error } = await supabase.from('price_alerts').delete().eq('id', id)
    if (error) throw new Error(`Alert konnte nicht gelöscht werden: ${error.message}`)
    setAlerts((prev: PriceAlertRow[]) => prev.filter((a) => a.id !== id))
  }

  return { items, alerts, loading, error, addWatchlistItem, updateWatchlistItem, deleteWatchlistItem, addAlert, deleteAlert, refetch: fetchWatchlist }
}
