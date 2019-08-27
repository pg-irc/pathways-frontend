import React from 'react';
import { View } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox, connectAutoComplete } from 'react-instantsearch-native';
import { SearchBox } from './search_box';
import { InfiniteHits } from './infinite_hits';
import { AutoCompleteComponent, Suggestion } from './auto_complete';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const SearchBoxConnectedComponent = connectSearchBox(SearchBox);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHits);
    const AutoCompleteConnectedComponent = connectAutoComplete<Suggestion>(AutoCompleteComponent);
    return <View>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent />
            <AutoCompleteConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>;
};
