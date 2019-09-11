import { connect, Dispatch } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { selectLocale } from '../../selectors/locale/select_locale';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): SearchComponentProps => ({
    apiKey: ALGOLIA_SEARCH_API_KEY,
    appId: 'MMYH1Z0D3O',
    currentLocale: selectLocale(store),
    currentPath: ownProps.location.pathname,
});

const mapDispatchToProps = (_: Dispatch<void>): SearchComponentActions => ({
    // tslint:disable-next-line:no-empty
    openMenu: (): void => { },
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
