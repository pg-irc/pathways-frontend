import React from 'react';
import { View } from 'react-native';

// this import fails @types. Fix seems to be:
// cd node_modules/@types/algoliasearch/ && cp index.d.ts reactnative.d.ts
// import algoliasearch from 'algoliasearch/reactnative';

import { InstantSearch } from 'react-instantsearch-native';
import { SearchBoxConnectedComponent } from './search_box_connected_component';
import { InfiniteHitsConnectedComponent } from './infinite_hits_connected_component';

export interface Props {
}

//const searchClient = algoliasearch('MMYH1Z0D3O', 'e1061983b287e13e653143c62afac446');

export const SearchComponent: React.StatelessComponent<Props> = (_: Props): JSX.Element => (
    <View>
        <InstantSearch
            //searchClient={searchClient}  // remove this?
            indexName='dev_services'
            root={this.root}
            apiKey={'e1061983b287e13e653143c62afac446'} // TODO pass these in as {...props}
            appId={'MMYH1Z0D3O'}
        >
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>
);
