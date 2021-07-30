import { getSearchParams } from './search'
import { NFTBrowseOptions, ResultType } from './types'

export const locations = {
  root: () => '/',
  signIn: () => '/sign-in',
  settings: () => '/settings',
  partners: () => '/partners',
  bids: () => '/bids',
  lands: () => '/lands',
  collectibles: () => '/collectibles',
  browse: (options?: NFTBrowseOptions) => {
    const params = getSearchParams(options)
    return params ? `/browse?${params.toString()}` : '/browse'
  },
  currentAccount: (options?: NFTBrowseOptions) => {
    const params = getSearchParams(options)
    return params ? `/account?${params.toString()}` : '/account'
  },
  account: (address: string = ':address', options?: NFTBrowseOptions) => {
    const params = getSearchParams(options)
    return params
      ? `/accounts/${address}?${params.toString()}`
      : `/accounts/${address}`
  },
  nft: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}`,
  item: (
    contractAddress: string = ':contractAddress',
    itemId: string = ':itemId'
  ) => `/contracts/${contractAddress}/items/${itemId}`,
  parcel: (x: string = ':x', y: string = ':y') => `/parcels/${x}/${y}/detail`,
  estate: (estateId: string = ':estateId') => `/estates/${estateId}/detail`,
  buy: (
    type: ResultType,
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/${getResource(type)}/${tokenId}/buy`,
  sell: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/sell`,
  cancel: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/cancel`,
  transfer: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/transfer`,
  bid: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/bid`,
  activity: () => `/activity`
}

function getResource(type: ResultType) {
  switch (type) {
    case ResultType.NFT:
      return 'tokens'
    case ResultType.ITEM:
      return 'items'
    default:
      throw new Error(`Invalid type ${type}`)
  }
}
