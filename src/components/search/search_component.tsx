import React from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import { InstantSearch, connectSearchBox, connectInfiniteHits } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { textStyles, values, colors } from '../../application/styles';
import { Content } from 'native-base';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content padder style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
            <Trans>Find a service</Trans>
        </Text>
        <InstantSearch {...props} >
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};
