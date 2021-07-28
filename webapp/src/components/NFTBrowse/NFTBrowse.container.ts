import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'

import { RootState } from '../../modules/reducer'
import { setView } from '../../modules/ui/actions'
import { browseNFTs, fetchNFTsFromRoute } from '../../modules/routing/actions'
import { FETCH_NFTS_REQUEST } from '../../modules/nft/actions'
import { getLoading as getLoadingNFTs } from '../../modules/nft/selectors'
import { getLoading as getLoadingItems } from '../../modules/item/selectors'
import {
  getIsMap,
  getOnlyOnSale,
  getResultType,
  getSection
} from '../../modules/routing/selectors'
import { getView } from '../../modules/ui/browse/selectors'
import { FETCH_ITEMS_REQUEST } from '../../modules/item/actions'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
  OwnProps,
  Props
} from './NFTBrowse.types'
import NFTBrowse from './NFTBrowse'
import { Section } from '../../modules/vendor/decentraland'

const mapState = (state: RootState): MapStateProps => ({
  isMap: getIsMap(state),
  onlyOnSale: getOnlyOnSale(state),
  section: getSection(state) as Section,
  isLoading:
    isLoadingType(getLoadingNFTs(state), FETCH_NFTS_REQUEST) ||
    isLoadingType(getLoadingItems(state), FETCH_ITEMS_REQUEST),
  resultType: getResultType(state),
  viewInState: getView(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSetView: view => dispatch(setView(view)),
  onFetchNFTsFromRoute: options => dispatch(fetchNFTsFromRoute(options)),
  onBrowse: options => dispatch(browseNFTs(options))
})

const mergeProps = (
  stateProps: MapStateProps,
  dispatchProps: MapDispatchProps,
  ownProps: OwnProps
): Props => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  section: ownProps.section ?? stateProps.section,
  isMap: stateProps.isMap ?? ownProps.isMap
})

export default connect(mapState, mapDispatch, mergeProps)(NFTBrowse)
