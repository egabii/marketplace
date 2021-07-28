import { Network, NFTCategory, WearableCategory } from '@dcl/schemas'
import { View } from '../ui/types'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { NFTBrowseOptions, SortBy } from './types'
import { ItemSortBy } from '../vendor/decentraland/item/types'

const SEARCH_ARRAY_PARAM_SEPARATOR = '_'

export function getDefaultOptionsByView(view?: View): NFTBrowseOptions {
  return {
    onlyOnSale: view !== View.ACCOUNT,
    sortBy: view === View.ACCOUNT ? SortBy.NEWEST : SortBy.RECENTLY_LISTED
  }
}

export function getSearchParams(options?: NFTBrowseOptions) {
  let params: URLSearchParams | undefined
  if (options) {
    params = new URLSearchParams()

    if (options.resultType) {
      params.set('results', options.resultType)
    }

    if (options.section) {
      params.set('section', options.section)
    }

    if (options.isMap !== undefined) {
      params.set('isMap', options.isMap.toString())
      // isFullscreen is only set if isMap is true
      if (options.isFullscreen !== undefined) {
        params.set('isFullscreen', options.isFullscreen.toString())
      }
    }

    if (options.vendor) {
      params.set('vendor', options.vendor)
    }
    if (options.page) {
      params.set('page', options.page.toString())
    }
    if (options.sortBy) {
      params.set('sortBy', options.sortBy)
    }
    if (options.onlyOnSale !== undefined) {
      params.set('onlyOnSale', options.onlyOnSale.toString())
    }
    if (options.wearableRarities && options.wearableRarities.length > 0) {
      params.set(
        'rarities',
        options.wearableRarities.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.wearableGenders && options.wearableGenders.length > 0) {
      params.set(
        'genders',
        options.wearableGenders.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.contracts && options.contracts.length > 0) {
      params.set(
        'contracts',
        options.contracts.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.search) {
      params.set('search', options.search)
    }

    if (options.network && Object.values(Network).includes(options.network)) {
      params.set('network', options.network)
    }
  }
  return params
}

export function getCategoryFromSection(section: Section) {
  // TODO: Move this to each vendor? Names shortened for brevity here
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.PARCELS:
      return NFTCategory.PARCEL
    case DclSection.ESTATES:
      return NFTCategory.ESTATE
    case DclSection.WEARABLES:
    case DclSection.WEARABLES_HEAD:
    case DclSection.WEARABLES_EYEBROWS:
    case DclSection.WEARABLES_EYES:
    case DclSection.WEARABLES_FACIAL_HAIR:
    case DclSection.WEARABLES_HAIR:
    case DclSection.WEARABLES_MOUTH:
    case DclSection.WEARABLES_UPPER_BODY:
    case DclSection.WEARABLES_LOWER_BODY:
    case DclSection.WEARABLES_FEET:
    case DclSection.WEARABLES_ACCESORIES:
    case DclSection.WEARABLES_EARRING:
    case DclSection.WEARABLES_EYEWEAR:
    case DclSection.WEARABLES_HAT:
    case DclSection.WEARABLES_HELMET:
    case DclSection.WEARABLES_MASK:
    case DclSection.WEARABLES_TIARA:
    case DclSection.WEARABLES_TOP_HEAD:
      return NFTCategory.WEARABLE
    case DclSection.ENS:
      return NFTCategory.ENS
  }
}

export function getSearchWearableSection(category: WearableCategory) {
  const DclSection = Section[VendorName.DECENTRALAND]
  for (const section of Object.values(DclSection)) {
    const sectionCategory = getSearchWearableCategory(section)
    if (category === sectionCategory) {
      return section
    }
  }
}

export function getSearchWearableCategory(section: Section) {
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.WEARABLES_EYEBROWS:
      return WearableCategory.EYEBROWS
    case DclSection.WEARABLES_EYES:
      return WearableCategory.EYES
    case DclSection.WEARABLES_FACIAL_HAIR:
      return WearableCategory.FACIAL_HAIR
    case DclSection.WEARABLES_HAIR:
      return WearableCategory.HAIR
    case DclSection.WEARABLES_MOUTH:
      return WearableCategory.MOUTH
    case DclSection.WEARABLES_UPPER_BODY:
      return WearableCategory.UPPER_BODY
    case DclSection.WEARABLES_LOWER_BODY:
      return WearableCategory.LOWER_BODY
    case DclSection.WEARABLES_FEET:
      return WearableCategory.FEET
    case DclSection.WEARABLES_EARRING:
      return WearableCategory.EARRING
    case DclSection.WEARABLES_EYEWEAR:
      return WearableCategory.EYEWEAR
    case DclSection.WEARABLES_HAT:
      return WearableCategory.HAT
    case DclSection.WEARABLES_HELMET:
      return WearableCategory.HELMET
    case DclSection.WEARABLES_MASK:
      return WearableCategory.MASK
    case DclSection.WEARABLES_TIARA:
      return WearableCategory.TIARA
    case DclSection.WEARABLES_TOP_HEAD:
      return WearableCategory.TOP_HEAD
  }
}

export function getItemSortBy(sortBy: SortBy): ItemSortBy {
  switch (sortBy) {
    case SortBy.CHEAPEST:
      return ItemSortBy.CHEAPEST
    case SortBy.NAME:
      return ItemSortBy.NAME
    case SortBy.NEWEST:
      return ItemSortBy.NEWEST
    case SortBy.RECENTLY_LISTED:
      return ItemSortBy.NEWEST
    default:
      return ItemSortBy.NEWEST
  }
}

export function getURLParamArray<T extends string>(
  search: string,
  paramName: string,
  validValues: string[] = []
) {
  const param = getURLParam<T>(search, paramName)
  return param === null
    ? []
    : (param
        .split(SEARCH_ARRAY_PARAM_SEPARATOR)
        .filter(item => validValues.includes(item as T)) as T[])
}

export function getURLParam<T extends string>(
  search: string,
  paramName: string
) {
  const param = new URLSearchParams(search).get(paramName) as T | null
  return param
}
