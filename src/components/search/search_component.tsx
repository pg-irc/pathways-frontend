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

// tslint:disable:no-expression-statement

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {

    const onlineStatus = useOnlineStatus();
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latlong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);
    useEffect(() => fetchLatLong(location, onlineStatus, _setLatLong), [onlineStatus, location]);

    const _setLocation = (s: string): void => {
        console.log(`Setting location to ${s}`);
        setLocation(s);
    };

    const _setLatLong = (latLong: LatLong): void => {
        console.log(`Setting latlong to ${JSON.stringify(latLong)}`);
        setLatLong(latLong);
    };

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
            <SearchBoxConnectedComponent location={location} setLocation={_setLocation} />
            <ConfigureConnectedComponent {...toConfiguration(latlong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};

const toConfiguration = (latlong?: LatLong): Object => {
    const hitsPerPage = 5;
    if (latlong) {
        const aroundLatLng = `${latlong.longitude},${latlong.latitude}`;
        // tslint:disable-next-line:no-expression-statement
        console.log(`aroundLatLng = ${aroundLatLng}`);

        return { aroundLatLng, hitsPerPage };
    }
    return { hitsPerPage };
};

const fetchLatLong = (location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (location !== '' && onlineStatus === OnlineStatus.Online) {
        const url = `https://geocoder.ca/?locate=${location}&json=1`;
        // tslint:disable-next-line:no-expression-statement
        fetch(url).
            then((response: Response) => response.ok ? response.text() : 'error').
            then((response: string) => JSON.parse(response)).
            // TODO change to     then(JSON.parse).
            then((response: object) => toGeoCoderLatLong(response)).
            then((response: LatLong) => setLatLong(response)).
            catch((error: string) => {
                // tslint:disable-next-line:no-expression-statement
                console.log(`LatLong set to undefined: ${error}`);
                // tslint:disable-next-line:no-expression-statement
                setLatLong(undefined);
            });
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
