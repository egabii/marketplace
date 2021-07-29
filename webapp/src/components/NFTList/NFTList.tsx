import React, { useCallback } from 'react'
import { Card, Button, Loader } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'

import { getMaxQuerySize, MAX_PAGE, PAGE_SIZE } from '../../modules/vendor/api'
import { AssetCard } from '../AssetCard'
import { Props } from './NFTList.types'
import { ResultType } from '../../modules/routing/types'
import { NFT } from '../../modules/nft/types'
import { Item } from '@dcl/schemas'

const NFTList = (props: Props) => {
  const {
    vendor,
    resultType,
    items,
    nfts,
    page,
    count,
    isLoading,
    onBrowse
  } = props

  const assets: (NFT | Item)[] = resultType === ResultType.ITEM ? items : nfts

  const handleLoadMore = useCallback(() => {
    const newPage = page + 1
    onBrowse({ page: newPage })
    getAnalytics().track('Load more', { page: newPage })
  }, [onBrowse, page])

  const maxQuerySize = getMaxQuerySize(vendor)

  const hasExtraPages =
    (assets.length !== count || count === maxQuerySize) && page <= MAX_PAGE

  const isLoadingNewPage = isLoading && nfts.length >= PAGE_SIZE

  return (
    <>
      <Card.Group>
        {assets.length > 0
          ? assets.map(assets => (
              <AssetCard key={resultType + '-' + assets.id} asset={assets} />
            ))
          : null}

        {isLoading ? (
          <>
            <div className="overlay" />
            <Loader size="massive" active />
          </>
        ) : null}
      </Card.Group>

      {assets.length === 0 && !isLoading ? (
        <div className="empty">{t('nft_list.empty')}</div>
      ) : null}

      {assets.length > 0 &&
      hasExtraPages &&
      (!isLoading || isLoadingNewPage) ? (
        <div className="load-more">
          <Button loading={isLoading} inverted primary onClick={handleLoadMore}>
            {t('global.load_more')}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default React.memo(NFTList)
