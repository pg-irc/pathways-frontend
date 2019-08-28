import React from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { textStyles, values, colors } from '../../application/styles';
import { Content } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
}

// // tslint:disable:no-mixed-interface
// interface RenderOptions {
//     readonly refine: () => void;
//     readonly widgetParams: object;
// }

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: SearchComponentProps): JSX.Element => {

    // const renderConfigure = (renderOptions: RenderOptions, isFirstRender: boolean): JSX.Element => {
    //     const { refine, widgetParams }: RenderOptions = renderOptions;

    //     if (isFirstRender) {
    //         // initial render and bind
    //     }

    //     // rendering logic
    //     return <EmptyComponent />;
    // };

    const renderConfigure = (): JSX.Element => {
        return <EmptyComponent />;
    };

    const CustomConfigure = connectConfigure(renderConfigure);

    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content padder style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
            <Trans>Find a service</Trans>
        </Text>
        <InstantSearch {...props} >
            <CustomConfigure aroundLatLng={'49.246292,-123.116226'} />
            <SearchBoxConnectedComponent />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};
