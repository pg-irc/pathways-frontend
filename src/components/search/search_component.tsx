import React from 'react';
import { View } from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import { SearchBoxConnectedComponent } from './search_box_connected_component';
import { InfiniteHitsConnectedComponent } from './infinite_hits_connected_component';

export interface Props {
}

export const SearchComponent: React.StatelessComponent<Props> = (_: Props): JSX.Element => (
    <View>
        <InstantSearch
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
