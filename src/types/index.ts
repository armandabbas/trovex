// Re-export database types and define UI-specific aliases
export type { CollectibleRow as Collectible, WatchlistRow as WatchlistItem, CategoryRow as Category } from './database'
export type { CollectibleWithImages, CollectibleInsert, CollectibleUpdate } from './database'
export type { ProfileRow, WatchlistInsert, WatchlistUpdate, PriceAlertRow } from './database'
