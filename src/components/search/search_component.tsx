import React, { useState } from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { textStyles, values, colors } from '../../application/styles';
import { Content } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {

    const [location, setLocation]: [string, (s: string) => void] = useState('');

    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    const configuration = {
        aroundLatLng: toLatLong(location),
    };

    return <Content padder style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
            <Trans>Find a service</Trans>
        </Text>
        <InstantSearch {...props} >
            <ConfigureConnectedComponent {...configuration} />
            <SearchBoxConnectedComponent
                location={location}
                setLocation={setLocation}
            />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};

const toLatLong = (s: string): string => {
    if (s.toLowerCase().startsWith('burn')) {
        return '49.267132,-122.968941';
    }
    if (s.toLowerCase().startsWith('surr')) {
        return '49.104431,-122.801094';
    }
    return '49.246292,-123.116226';
};
