import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent } from './search_component';

const mapStateToProps = (_: Store): SearchComponentProps => ({
    indexName: 'dev_services',
    apiKey: 'e1061983b287e13e653143c62afac446',
    appId: 'MMYH1Z0D3O',
});

export const SearchConnectedComponent = connect(mapStateToProps)(SearchComponent);
