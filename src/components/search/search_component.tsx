import React from 'react';
import { View } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox } from 'react-instantsearch-native';
import { SearchBox } from './search_box';
import { InfiniteHits } from './infinite_hits';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const SearchBoxConnectedComponent = connectSearchBox(SearchBox);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHits);
    return <View>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>;
};
