import React, { useState } from 'react';
import { View } from 'react-native';
import { InstantSearch, connectSearchBox, connectAutoComplete } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { AutoCompleteComponent, Prediction } from './auto_complete_component';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

const MY_LOCATION = 'My location';

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState(MY_LOCATION);

    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const AutoCompleteConnectedComponent = connectAutoComplete<Prediction>(AutoCompleteComponent);
    return <View>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent location={location} setLocation={setLocation} />
            <AutoCompleteConnectedComponent />
        </InstantSearch>
    </View>;
};
