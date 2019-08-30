import React, { useState } from 'react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchBoxComponent } from './search_box_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content, Header, Right, Title } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { Locale } from '../../locale';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';

export interface SearchComponentProps {
    readonly indexName: string;
    readonly apiKey: string;
    readonly appId: string;
    readonly currentLocale: Locale;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {

    const [location, setLocation]: [string, (s: string) => void] = useState('');

    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const SearchBoxConnectedComponent = connectSearchBox(SearchBoxComponent);
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    const configuration = {
        aroundLatLng: toLatLong(location),
    };

    return <Content style={{ backgroundColor: colors.teal }}>
        <ScreenHeader {...props} />
        <InstantSearch {...props} >
            <ConfigureConnectedComponent {...configuration} />
            <SearchBoxConnectedComponent location={location} setLocation={setLocation} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
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

// TODO use https://geocoder.ca/ to look up addresses or postal codes, free for non-profits

const toLatLong = (s: string): string => {
    if (s.toLowerCase().startsWith('burn')) {
        return '49.267132,-122.968941';
    }
    if (s.toLowerCase().startsWith('surr')) {
        return '49.104431,-122.801094';
    }
    return '49.246292,-123.116226';
};
