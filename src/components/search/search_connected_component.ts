import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { saveService, SaveServiceAction } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { getSavedServicesIds } from '../../selectors/services/get_saved_services_ids';
import { ServicesAction, AddServiceToSavedListAction, addServiceToSavedListAction,
        removeServiceFromSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';
import { InfiniteHitsActions } from './infinite_hits_component';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
    savedServicesIds: getSavedServicesIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<ServicesAction>): SearchComponentActions | InfiniteHitsActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction =>
        dispatch(saveService(service)),
    addServiceToSavedList: (service: HumanServiceData): AddServiceToSavedListAction =>
        dispatch(addServiceToSavedListAction(service)),
    removeServiceFromSavedList: (service: HumanServiceData): RemoveServiceFromSavedListAction =>
        dispatch(removeServiceFromSavedListAction(service)),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
