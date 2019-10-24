// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { InstantSearch, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors, values } from '../../application/styles';
import { Content, Icon } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/geocoder/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate as useTraceComponentUpdates } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';

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

    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.pale }}>
        <InstantSearch indexName={servicesIndex()} {...props} >
            <Modal
                visible={modalState !== 'None'}
                transparent={false}
                presentationStyle={'fullScreen'}
            >
                <View style={{ marginTop: 22 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={(): void => { setModalState('None'); }}>
                            <Icon name={'arrow-left'} type='FontAwesome' style={{ fontSize: values.mediumIconSize }} />
                        </TouchableOpacity>
                        <TextInput style={{ flex: 1 }} />
                        <TouchableOpacity onPress={(): void => { setModalState('None'); }}>
                            <Icon name={'map-marker'} type='FontAwesome' style={{ fontSize: values.mediumIconSize }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);
