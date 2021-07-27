import React, { useCallback, useEffect } from 'react'
import { Container, Page, Responsive } from 'decentraland-ui'

import { View } from '../../modules/ui/types'
import { Atlas } from '../Atlas'
import { AccountSidebar } from '../AccountSidebar'
import { NFTList } from '../NFTList'
import { VendorStrip } from '../VendorStrip'
import { Row } from '../Layout/Row'
import { Column } from '../Layout/Column'
import { NFTFilters } from '../Vendor/NFTFilters'
import { NFTSidebar } from '../Vendor/NFTSidebar'
import { Props } from './NFTBrowse.types'
import { ToggleBox } from './ToggleBox'
import './NFTBrowse.css'
import { Section } from '../../modules/vendor/decentraland'

const hasPrimarySales = (section?: Section) => {
  switch (section) {
    case Section.WEARABLES:
    case Section.WEARABLES_HEAD:
    case Section.WEARABLES_EYEBROWS:
    case Section.WEARABLES_EYES:
    case Section.WEARABLES_FACIAL_HAIR:
    case Section.WEARABLES_HAIR:
    case Section.WEARABLES_MOUTH:
    case Section.WEARABLES_UPPER_BODY:
    case Section.WEARABLES_LOWER_BODY:
    case Section.WEARABLES_FEET:
    case Section.WEARABLES_ACCESORIES:
    case Section.WEARABLES_EARRING:
    case Section.WEARABLES_EYEWEAR:
    case Section.WEARABLES_HAT:
    case Section.WEARABLES_HELMET:
    case Section.WEARABLES_MASK:
    case Section.WEARABLES_TIARA:
    case Section.WEARABLES_TOP_HEAD: {
      return true
    }
    default:
      return false
  }
}

const NFTBrowse = (props: Props) => {
  const {
    vendor,
    view,
    isMap,
    isFullscreen,
    address,
    onSetView,
    onFetchNFTsFromRoute,
    onBrowse,
    section,
    sections,
    onlyOnSale,
    viewInState
  } = props

  // Kick things off
  useEffect(() => {
    onSetView(view)
  }, [onSetView, view])

  useEffect(() => {
    if (viewInState === view) {
      onFetchNFTsFromRoute({
        vendor,
        view,
        address,
        onlyOnSale
      })
    }
  }, [view, vendor, address, onlyOnSale, viewInState, onFetchNFTsFromRoute])

  // handlers
  const handleSetFullscreen = useCallback(
    () => onBrowse({ isMap: true, isFullscreen: true }),
    [onBrowse]
  )

  // classes
  let classes = ['NFTBrowse']
  if (isMap) {
    classes.push('is-map')
  }

  return (
    <Page className={classes.join(' ')} isFullscreen={isFullscreen}>
      <Row>
        {isFullscreen ? null : (
          <Column align="left" className="sidebar">
            {hasPrimarySales(section) ? (
              <ToggleBox
                header="Type"
                items={[
                  {
                    title: 'Originals',
                    description: 'Original creations by users',
                    onClick: () => undefined
                  },
                  {
                    title: 'Offers',
                    description: 'Collectibles being reselled',
                    onClick: () => undefined
                  }
                ]}
              />
            ) : null}
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              {view === View.ACCOUNT ? (
                <AccountSidebar address={address!} />
              ) : (
                <NFTSidebar sections={sections} />
              )}
            </Responsive>
          </Column>
        )}

        <Column align="right" grow={true}>
          {view === View.ACCOUNT && !isFullscreen ? (
            <VendorStrip address={address!} />
          ) : null}
          {isMap && isFullscreen ? (
            <div className="blur-background">
              <Container>
                <NFTFilters isMap={isMap} />
              </Container>
            </div>
          ) : (
            <NFTFilters isMap={Boolean(isMap)} />
          )}
          {isMap ? (
            <div className="Atlas">
              <Atlas withNavigation withPopup showOnSale={onlyOnSale} />
              <div
                className="fullscreen-button"
                onClick={handleSetFullscreen}
              />
            </div>
          ) : (
            <NFTList />
          )}
        </Column>
      </Row>
    </Page>
  )
}

export default React.memo(NFTBrowse)
