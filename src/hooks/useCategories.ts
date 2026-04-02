import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { CategoryRow } from '../types/database'

export function useCategories() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (fetchError) throw fetchError
      setCategories(data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Kategorien.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories
  }
}
