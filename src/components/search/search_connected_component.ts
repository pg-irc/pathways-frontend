import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { saveService, SaveServiceAction } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (_: Store): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
});

const mapDispatchToProps = (dispatch: Dispatch<SaveServiceAction>): SearchComponentActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction =>
        dispatch(saveService(service)),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
