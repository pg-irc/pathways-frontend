import React from 'react';
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
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    const configuration = {
        aroundLatLng: '49.104431,-122.801094',
    };

    return <Content padder style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
            <Trans>Find a service</Trans>
        </Text>
        <InstantSearch {...props} >
            <ConfigureConnectedComponent {...configuration} />
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};
