import React, { useState } from 'react';
import { View } from 'react-native';
import { InstantSearch, connectSearchBox, connectInfiniteHits } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

const MY_LOCATION = 'My location';

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState(MY_LOCATION);

    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <View>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent location={location} setLocation={setLocation} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </View>;
};
