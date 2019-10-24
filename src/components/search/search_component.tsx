// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { InstantSearch, connectInfiniteHits, connectConfigure, connectSearchBox } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content, Icon } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/geocoder/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate as useTraceComponentUpdates } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { Trans } from '@lingui/react';
import { SearchInputComponent } from './search_input_component';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentPath: string;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

export const SearchComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceComponentUpdates('SearchComponent', props);
    const [modalState, setModalState]: [string, (s: string) => void] = useState('None');
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    // tslint:disable-next-line:no-expression-statement
    useFetchLatLongFromLocation(location, setLatLong);

    // TODO connect to SearchTermInputModal instead
    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.pale }}>
        <InstantSearch indexName={servicesIndex()} {...props} >
            <SearchTermInputModal
                visible={modalState === 'Search'}
                onEndEditing={(_: string): void => {
                    setModalState('None');
                }} />
            <LocationInputModal
                visible={modalState === 'Location'}
                onEndEditing={(newLocation: string): void => {
                    setModalState('None');
                    setLocation(newLocation);
                }}
                onUseMyLocation={(): void => {
                    setModalState('None');
                    setLocation('');
                }} />

            <SearchInputConnectedComponent
                location={location}
                setLocation={setLocation}
                latLong={latLong}
                openSearchTermInput={(): void => { setModalState('Search'); }}
                openLocationInput={(): void => { setModalState('Location'); }}
            />

            <TouchableOpacity
                onPress={(): void => {
                    setModalState('Search');
                }}>
                <Text>Click for search term</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={(): void => {
                    setModalState('Location');
                    setLocation('foo');
                }}>
                <Text>Click for location</Text>
            </TouchableOpacity>
            <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};

interface SearchTermInputModalProps {
    readonly visible: boolean;
    // tslint:disable-next-line:no-mixed-interface
    readonly onEndEditing: (s: string) => void;
    readonly onUseMyLocation?: () => void;
}

const SearchTermInputModal: React.StatelessComponent<SearchTermInputModalProps> = (props: SearchTermInputModalProps): JSX.Element => {
    const [searchTerm, setSearchTerm]: [string, (s: string) => void] = useState('');

    const onEndEditing = (): void => {
        props.onEndEditing(searchTerm);
    };

    const BackButton = (): JSX.Element => (
        <TouchableOpacity onPress={onEndEditing}>
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity>);

    const ClearButton = (): JSX.Element => (
        <TouchableOpacity onPress={(): void => { setSearchTerm(''); }}>
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>);

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'}    >
        <View style={{ marginTop: 22 }}>
            <View style={{ flexDirection: 'row' }}>
                <BackButton />
                <TextInput
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onEndEditing={onEndEditing}
                    placeholder={'Search term'}
                    style={{ flex: 1 }}
                />
                <ClearButton />
            </View>
        </View>
    </Modal>;
};

const LocationInputModal: React.StatelessComponent<SearchTermInputModalProps> = (props: SearchTermInputModalProps): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState('');

    const BackButton = (): JSX.Element => (
        <TouchableOpacity onPress={onEndEditing} >
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity >);

    const ClearButton = (): JSX.Element => (
        <TouchableOpacity onPress={(): void => { setLocation(''); }}>
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>);

    const MyLocationButton = (): JSX.Element => (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onUseMyLocation}>
            <Icon name={'arrow-back'} style={{}} />
            <Text><Trans>My location</Trans></Text>
        </TouchableOpacity>);

    const onEndEditing = (): void => {
        props.onEndEditing(location);
    };

    const onUseMyLocation = (): void => {
        if (props.onUseMyLocation) {
            props.onUseMyLocation();
        }
    };

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'}    >
        <View style={{ flexDirection: 'column', marginTop: 22 }}>
            <View style={{ flexDirection: 'row' }}>
                <BackButton />
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={onEndEditing}
                    placeholder={'Location'}
                    style={{ flex: 1 }}
                />
                <ClearButton />
            </View>
            <MyLocationButton />
        </View>
    </Modal>;
};

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);
