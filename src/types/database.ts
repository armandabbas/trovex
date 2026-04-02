export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      categories: {
        Row: CategoryRow
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      collectibles: {
        Row: CollectibleRow
        Insert: CollectibleInsert
        Update: CollectibleUpdate
      }
      collectible_images: {
        Row: CollectibleImageRow
        Insert: CollectibleImageInsert
        Update: CollectibleImageUpdate
      }
      price_history: {
        Row: PriceHistoryRow
        Insert: PriceHistoryInsert
        Update: PriceHistoryUpdate
      }
      watchlist: {
        Row: WatchlistRow
        Insert: WatchlistInsert
        Update: WatchlistUpdate
      }
      price_alerts: {
        Row: PriceAlertRow
        Insert: PriceAlertInsert
        Update: PriceAlertUpdate
      }
    }
  }
}

export interface ProfileRow {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  preferred_currency: string
  created_at: string
  updated_at: string
}

export type ProfileInsert = Omit<ProfileRow, 'created_at' | 'updated_at'>
export type ProfileUpdate = Partial<Omit<ProfileRow, 'id' | 'created_at'>>

export interface CategoryRow {
  id: string
  name: string
  slug: string
  icon: string | null
  description: string | null
}

export type CategoryInsert = Omit<CategoryRow, 'id'>
export type CategoryUpdate = Partial<Omit<CategoryRow, 'id'>>

export interface CollectibleRow {
  id: string
  user_id: string
  category_id: string
  name: string
  description: string | null
  brand: string | null
  series: string | null
  year: number | null
  condition: string | null
  grade: string | null
  grading_service: string | null
  purchase_price: number | null
  purchase_date: string | null
  purchase_source: string | null
  current_estimated_value: number | null
  quantity: number
  status: string
  notes: string | null
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export type CollectibleInsert = Omit<CollectibleRow, 'id' | 'created_at' | 'updated_at' | 'quantity' | 'status' | 'is_favorite'> & {
  quantity?: number
  status?: string
  is_favorite?: boolean
}
export type CollectibleUpdate = Partial<Omit<CollectibleRow, 'id' | 'user_id' | 'created_at'>>

export interface CollectibleImageRow {
  id: string
  collectible_id: string
  image_url: string
  is_primary: boolean
  sort_order: number | null
  created_at: string
}

export type CollectibleImageInsert = Omit<CollectibleImageRow, 'id' | 'created_at' | 'is_primary' | 'sort_order'> & {
  is_primary?: boolean
  sort_order?: number
}
export type CollectibleImageUpdate = Partial<Omit<CollectibleImageRow, 'id' | 'collectible_id' | 'created_at'>>

export interface PriceHistoryRow {
  id: string
  collectible_id: string
  price: number
  source: string | null
  recorded_at: string
}

export type PriceHistoryInsert = Omit<PriceHistoryRow, 'id' | 'recorded_at'> & {
  recorded_at?: string
}
export type PriceHistoryUpdate = Partial<Omit<PriceHistoryRow, 'id'>>

export interface WatchlistRow {
  id: string
  user_id: string
  name: string
  category_id: string | null
  target_price: number | null
  current_price: number | null
  external_url: string | null
  notes: string | null
  created_at: string
}

export type WatchlistInsert = Omit<WatchlistRow, 'id' | 'created_at'>
export type WatchlistUpdate = Partial<Omit<WatchlistRow, 'id' | 'user_id' | 'created_at'>>

export interface PriceAlertRow {
  id: string
  user_id: string
  collectible_id: string | null
  watchlist_id: string | null
  alert_type: string
  threshold_value: number
  is_active: boolean
  last_triggered_at: string | null
  created_at: string
}

export type PriceAlertInsert = Omit<PriceAlertRow, 'id' | 'created_at' | 'is_active' | 'last_triggered_at'> & {
  is_active?: boolean
  last_triggered_at?: string
}
export type PriceAlertUpdate = Partial<Omit<PriceAlertRow, 'id' | 'user_id' | 'created_at'>>

// Joined types for UI
export interface CollectibleWithImages extends CollectibleRow {
  collectible_images: CollectibleImageRow[]
  categories: CategoryRow | null
}
