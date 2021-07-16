import { Network, Rarity, WearableCategory } from '@dcl/schemas'
import { WearableGender } from '../../../nft/wearable/types'

export type ItemFilters = {
  first?: number
  skip?: number
  sortBy?: ItemSortBy
  creator?: string
  isSoldOut?: boolean
  isOnSale?: boolean
  search?: string
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  rarities?: Rarity[]
  wearableGenders?: WearableGender[]
  contractAddress?: string
  itemId?: string
  network?: Network
}

export enum ItemSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  CHEAPEST = 'cheapest'
}
