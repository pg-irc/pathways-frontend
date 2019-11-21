import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { ServicesAction, AddServiceToSavedListAction, addServiceToSavedListAction,
        removeServiceFromSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';
import { InfiniteHitsActions } from './infinite_hits_component';
import { HumanServiceData } from '../../validation/services/types';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
    currentPath: ownProps.location.pathname,
    savedServices: store.services.savedServices,
});

const mapDispatchToProps = (dispatch: Dispatch<ServicesAction>): InfiniteHitsActions => ({
    addServiceToSavedListAction: (service: HumanServiceData): AddServiceToSavedListAction => {
        return dispatch(addServiceToSavedListAction(service));
    },
    removeServiceFromSavedListAction: (service: HumanServiceData): RemoveServiceFromSavedListAction => {
        return dispatch(removeServiceFromSavedListAction(service));
    },
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
