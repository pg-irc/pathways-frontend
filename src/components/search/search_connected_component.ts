import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { saveService, SaveServiceAction } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
});

type Actions = SaveServiceAction | DisableAnalyticsAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): SearchComponentActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction => (
        dispatch(saveService(service))
    ),
    disableAnalytics: (disable: boolean): DisableAnalyticsAction => (
        dispatch(disableAnalytics(disable))
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
