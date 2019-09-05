import React, { useState, useEffect } from 'react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content, Header, Right, Title } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { Locale } from '../../locale';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { useOnlineStatus, OnlineStatus } from '../../hooks/use_online_status';
import { LatLong } from './types';
import { toGeoCoderLatLong } from './validation';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentLocale: Locale;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {

    const onlineStatus = useOnlineStatus();
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latlong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);
    // tslint:disable-next-line:no-expression-statement
    useEffect(() => fetchLatLong(location, onlineStatus, setLatLong), [onlineStatus, location]);

    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    // organization search cannot take aroundLatLng argument
    // create a second InstantSearch with
    //    a non-visible SearchBoxConnectedComponent that calls refine with the value from the first one
    //    a ConfigureConnectedComponent that does not take the lat/long
    //    the same InfiniteHitsConnectedComponent
    return <Content style={{ backgroundColor: colors.teal }}>
        <ScreenHeader {...props} />
        <InstantSearch indexName='dev_services' {...props} >
            <SearchBoxConnectedComponent location={location} setLocation={setLocation} />
            <ConfigureConnectedComponent {...toConfiguration(latlong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
        <InstantSearch indexName='dev_organizations' {...props} >
            <SearchBoxConnectedComponent location={location} setLocation={setLocation} />
            <ConfigureConnectedComponent hitsPerPage={5} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};

const toConfiguration = (latlong?: LatLong): Object => {
    if (latlong) {
        return {
            aroundLatLng: `${latlong.longitude},${latlong.latitude}`,
            hitsPerPage: 5,
        };
    }
    return {
        hitsPerPage: 5,
    };
};

// TODO use https://geocoder.ca/ to look up addresses or postal codes, free for non-profits,
// but it looks like we don't need to talk to then until their throttling becomes a problem for us.
// GET https://geocoder.ca/?locate=V0G1R0&json=1 brings back a response with lat/long
// GET https://geocoder.ca/?locate=205+6+Ave+NW%2C+Nakusp%2C+BC+V0G+1R0&json=1 the same
// GET https://geocoder.ca/?locate=Vancouver&json=1
// GET https://geocoder.ca/?locate=Prince+George&json=1

const fetchLatLong = (location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (onlineStatus === OnlineStatus.Online) {
        const url = `https://geocoder.ca/?locate=${location}&json=1`;
        // tslint:disable-next-line:no-expression-statement
        fetch(url).
            then((response: Response) => response.ok ? response.text() : 'error').
            then((json: string) => toGeoCoderLatLong(json)).
            then((latlong: LatLong) => setLatLong(latlong)).
            catch((_: string) => setLatLong(undefined));
    }
};

const ScreenHeader = (props: Props): JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    return <Header style={{ marginTop, backgroundColor: colors.teal, borderBottomColor: 'transparent' }}>
        <Title>Find a service</Title>
        <Right style={{ alignItems: 'center' }}>
            <MenuButtonComponent
                onPress={props.openMenu}
                locale={props.currentLocale}
                textColor={colors.white}
            />
        </Right>
    </Header>;
};
