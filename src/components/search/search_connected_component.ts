import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { saveService, SaveServiceAction } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { ServicesAction, BookmarkServiceAction, bookmarkService,
        unbookmarkService, UnbookmarkServiceAction } from '../../stores/services/actions';
import { InfiniteHitsActions } from './infinite_hits_component';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<ServicesAction>): SearchComponentActions | InfiniteHitsActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction =>
        dispatch(saveService(service)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
