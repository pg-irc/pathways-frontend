import React, { useState, useEffect } from 'react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { Locale } from '../../locale';
import { useOnlineStatus } from '../../hooks/use_online_status';
import { LatLong } from './types';
import { fetchLatLongFromAddress } from './fetch_lat_long_from_address';
import { toServiceSearchConfiguration } from './configuration';
import { ScreenHeaderComponent } from './screen_header_component';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentLocale: Locale;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

// tslint:disable:no-expression-statement

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {

    const onlineStatus = useOnlineStatus();
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);
    useEffect(() => fetchLatLongFromAddress(location, onlineStatus, _setLatLong), [onlineStatus, location]);

    const _setLocation = (s: string): void => {
        console.log(`Setting location to ${s}`);
        setLocation(s);
    };

    const _setLatLong = (l: LatLong): void => {
        console.log(`Setting latlong to ${JSON.stringify(l)}`);
        setLatLong(l);
    };

    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.teal }}>
        <ScreenHeaderComponent {...props} />
        <InstantSearch indexName='dev_services' {...props} >
            <SearchBoxConnectedComponent location={location} setLocation={_setLocation} latLong={latLong} />
            <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};
