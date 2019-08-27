import React from 'react';
import { View } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox, connectAutoComplete } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { AutoCompleteComponent, Suggestion } from './auto_complete_component';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);
    const AutoCompleteConnectedComponent = connectAutoComplete<Suggestion>(AutoCompleteComponent);
    return <View>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent />
            <AutoCompleteConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>;
};
