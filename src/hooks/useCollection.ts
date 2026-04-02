import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { CollectibleWithImages, CollectibleInsert, CollectibleUpdate, CategoryRow } from '../types/database'
import { compressImage } from '../lib/utils'

interface UseCollectionOptions {
  categoryFilter?: string
  statusFilter?: string
  conditionFilter?: string
  sortBy?: 'name' | 'current_estimated_value' | 'purchase_date' | 'created_at'
  sortOrder?: 'asc' | 'desc'
  favoritesOnly?: boolean
}

export function useCollection(options: UseCollectionOptions = {}) {
  const { user } = useAuth()
  const [items, setItems] = useState<CollectibleWithImages[]>([])
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('collectibles')
        .select('*, collectible_images(*), categories(*)')
        .eq('user_id', user.id)

      if (options.categoryFilter) {
        query = query.eq('category_id', options.categoryFilter)
      }
      if (options.statusFilter) {
        query = query.eq('status', options.statusFilter)
      }
      if (options.conditionFilter) {
        query = query.eq('condition', options.conditionFilter)
      }
      if (options.favoritesOnly) {
        query = query.eq('is_favorite', true)
      }

      const sortCol = options.sortBy ?? 'created_at'
      const sortOrd = options.sortOrder === 'asc' ? true : false
      query = query.order(sortCol, { ascending: sortOrd })

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setItems((data as CollectibleWithImages[]) ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Sammlung.')
    } finally {
      setLoading(false)
    }
  }, [user, options.categoryFilter, options.statusFilter, options.conditionFilter, options.sortBy, options.sortOrder, options.favoritesOnly])

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('name')
    setCategories(data ?? [])
  }, [])

  useEffect(() => {
    fetchItems()
    fetchCategories()
  }, [fetchItems, fetchCategories])

  async function addItem(item: CollectibleInsert, images?: File[]): Promise<string> {
    if (!user) throw new Error('Nicht angemeldet.')

    const { data, error } = await supabase
      .from('collectibles')
      .insert({ ...item, user_id: user.id } as any)
      .select()
      .single()

    if (error) throw new Error(`Item konnte nicht erstellt werden: ${error.message}`)

    if (images && images.length > 0) {
      await uploadImages((data as any).id, images)
    }

    await fetchItems()
    return (data as any).id
  }

  async function updateItem(id: string, updates: CollectibleUpdate, newImages?: File[]): Promise<void> {
    const { error } = await supabase
      .from('collectibles')
      // @ts-ignore
      .update({ ...updates, updated_at: new Date().toISOString() } as any)
      .eq('id', id)

    if (error) throw new Error(`Item konnte nicht aktualisiert werden: ${error.message}`)

    if (newImages && newImages.length > 0) {
      await uploadImages(id, newImages)
    }

    await fetchItems()
  }

  async function deleteItem(id: string): Promise<void> {
    // Delete images from storage first
    const { data: images } = await supabase
      .from('collectible_images')
      .select('image_url')
      .eq('collectible_id', id)

    if (images) {
      const paths = images
        .map((img: any) => {
          const url = new URL(img.image_url)
          const parts = url.pathname.split('/storage/v1/object/public/collectibles/')
          return parts[1] ?? ''
        })
        .filter(Boolean)

      if (paths.length > 0) {
        await supabase.storage.from('collectibles').remove(paths)
      }
    }

    const { error } = await supabase.from('collectibles').delete().eq('id', id)
    if (error) throw new Error(`Item konnte nicht gelöscht werden: ${error.message}`)

    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  async function toggleFavorite(id: string, current: boolean): Promise<void> {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_favorite: !current } : item)),
    )

    const { error } = await supabase
      .from('collectibles')
      // @ts-ignore
      .update({ is_favorite: !current } as any)
      .eq('id', id)

    if (error) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_favorite: current } : item)),
      )
    }
  }

  async function uploadImages(collectibleId: string, files: File[]): Promise<void> {
    if (!user) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const compressed = await compressImage(file)
      const path = `${user.id}/${collectibleId}/${Date.now()}_${i}.jpg`

      const { error: uploadError } = await supabase.storage
        .from('collectibles')
        .upload(path, compressed)

      if (uploadError) continue

      const { data: { publicUrl } } = supabase.storage
        .from('collectibles')
        .getPublicUrl(path)

      await supabase.from('collectible_images').insert({
        collectible_id: collectibleId,
        image_url: publicUrl,
        is_primary: i === 0,
        sort_order: i,
      } as any)
    }
  }

  async function deleteImage(imageId: string, imageUrl: string): Promise<void> {
    try {
      const url = new URL(imageUrl)
      const parts = url.pathname.split('/storage/v1/object/public/collectibles/')
      const path = parts[1]
      if (path) {
        await supabase.storage.from('collectibles').remove([path])
      }
    } catch {
      // URL parsing failed, skip storage deletion
    }

    await supabase.from('collectible_images').delete().eq('id', imageId)
    await fetchItems()
  }

  return {
    items,
    categories,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    deleteImage,
    refetch: fetchItems,
  }
}
