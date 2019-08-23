import React from 'react';
import { View } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox } from 'react-instantsearch-native';
import { SearchBox } from './search_box';
import { InfiniteHits } from './infinite_hits';

const SearchBoxConnectedComponent = connectSearchBox(SearchBox);
const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHits);

export const SearchComponent: React.StatelessComponent = (): JSX.Element => {
    return <View>
        <InstantSearch
            indexName='dev_services'
            root={this.root}
            apiKey={'e1061983b287e13e653143c62afac446'} // TODO pass these in as {...props}
            appId={'MMYH1Z0D3O'}
        >
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>;
};
