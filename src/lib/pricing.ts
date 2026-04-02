import { supabase } from './supabase'
import type { PriceHistoryRow } from '../types/database'

export async function getPriceHistory(
  collectibleId: string,
  days = 90,
): Promise<PriceHistoryRow[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data, error } = await supabase
    .from('price_history')
    .select('*')
    .eq('collectible_id', collectibleId)
    .gte('recorded_at', since.toISOString())
    .order('recorded_at', { ascending: true })

  if (error) throw new Error(`Preisverlauf konnte nicht geladen werden: ${error.message}`)
  return (data as any) ?? []
}

export async function addPriceEntry(
  collectibleId: string,
  price: number,
  source = 'manual',
): Promise<void> {
  const { error } = await supabase.from('price_history').insert({
    collectible_id: collectibleId,
    price,
    source,
  } as any)

  if (error) throw new Error(`Preiseintrag konnte nicht gespeichert werden: ${error.message}`)
}

export function calculateProfitLoss(
  purchasePrice: number,
  currentValue: number,
): { amount: number; percentage: number } {
  const amount = currentValue - purchasePrice
  const percentage = purchasePrice > 0 ? (amount / purchasePrice) * 100 : 0
  return { amount, percentage }
}
