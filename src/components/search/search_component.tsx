import React, { useState } from 'react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchInputComponent } from './search_input_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/search/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate as useTraceComponentUpdates } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentPath: string;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceComponentUpdates('SearchComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    // tslint:disable-next-line:no-expression-statement
    useFetchLatLongFromLocation(location, setLatLong);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.pale }}>
        <InstantSearch indexName={servicesIndex()} {...props} >
            <SearchInputConnectedComponent location={location} setLocation={setLocation} latLong={latLong} />
            <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);