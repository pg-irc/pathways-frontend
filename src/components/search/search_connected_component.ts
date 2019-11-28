import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';

const mapStateToProps = (_: Store): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
});

export const SearchConnectedComponent = connect(mapStateToProps)(SearchComponent);
