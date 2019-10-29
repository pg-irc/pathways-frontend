// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { InstantSearch, connectInfiniteHits, connectConfigure, connectSearchBox } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content, Icon } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/latlong/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate as useTraceComponentUpdates } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { View, Text } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { SearchTermAndLocationComponent } from './search_term_and_location_component';
import { ReactI18nRenderProp } from '../../locale/types';
import { MODAL_NONE, MODAL_SEARCH_TERM, MODAL_LOCATION, USE_MY_LOCATION } from './constants';
import { SearchTermInputModal } from './search_term_input_modal';

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

    const [modalState, setModalState]: [string, (s: string) => void] = useState(MODAL_NONE);
    const [searchTerm, setSearchTerm]: [string, (s: string) => void] = useState('');
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    // tslint:disable-next-line:no-expression-statement
    useFetchLatLongFromLocation(location, setLatLong);

    // refactor localized strings
    const ConnectedSearchTermInputModal = connectSearchBox(SearchTermInputModal);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <I18n>{(reactI18nRenderProp: ReactI18nRenderProp): JSX.Element => {

        const _ = reactI18nRenderProp.i18n._.bind(reactI18nRenderProp.i18n);
        const searchTermPlaceHolder = _('Search for services');
        const locationPlaceHolder = _('City, address or postal code');
        const nearMyLocationPlaceHolder = _('Near My location');

        return <Content style={{ backgroundColor: colors.pale }}>
            <InstantSearch indexName={servicesIndex()} {...props} >
                <ConnectedSearchTermInputModal
                    placeholder={searchTermPlaceHolder}
                    visible={modalState === MODAL_SEARCH_TERM}
                    onEndEditing={(newSearchTerm: string): void => {
                        setModalState(MODAL_NONE);
                        setSearchTerm(newSearchTerm);
                    }} />

                <LocationInputModal
                    placeholder={locationPlaceHolder}
                    visible={modalState === MODAL_LOCATION}
                    onEndEditing={(s: string): void => {
                        setLocation(s);
                        setModalState(MODAL_NONE);
                    }}
                    onUseMyLocation={(): void => {
                        setLocation(USE_MY_LOCATION);
                        setModalState(MODAL_NONE);
                    }} />

                <SearchTermAndLocationComponent
                    searchTerm={searchTerm}
                    location={location}
                    setLocation={setLocation}
                    latLong={latLong}
                    searchTermPlaceHolder={searchTermPlaceHolder}
                    locationPlaceHolder={locationPlaceHolder}
                    nearMyLocationPlaceHolder={nearMyLocationPlaceHolder}
                    openSearchTermInput={(): void => { setModalState(MODAL_SEARCH_TERM); }}
                    openLocationInput={(): void => { setModalState(MODAL_LOCATION); }}
                />
                <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
                <InfiniteHitsConnectedComponent />
            </InstantSearch>
        </Content>;
    }}</I18n>;
};

interface LocationInputModalProps {
    readonly visible: boolean;
    readonly placeholder: string;
    readonly onEndEditing: (s: string) => void;
    readonly onUseMyLocation: () => void;
}

const LocationInputModal: React.StatelessComponent<LocationInputModalProps> = (props: LocationInputModalProps): JSX.Element => {
    const [location, setLocation]: [string, (s: string) => void] = useState('');

    const BackButton = (): JSX.Element => (
        <TouchableOpacity onPress={onEndEditing} >
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity >);

    const ClearInputButton = (): JSX.Element => (
        <TouchableOpacity onPress={(): void => { setLocation(''); }}>
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>);

    const UseMyLocationButton = (): JSX.Element => (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={props.onUseMyLocation}>
            <Icon name={'arrow-back'} style={{}} />
            <Text><Trans>My location</Trans></Text>
        </TouchableOpacity>);

    const onEndEditing = (): void => {
        props.onEndEditing(location);
    };

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'}    >
        <View style={{ flexDirection: 'column', marginTop: 22 }}>
            <View style={{ flexDirection: 'row' }}>
                <BackButton />
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={onEndEditing}
                    placeholder={props.placeholder}
                    style={{ flex: 1 }}
                />
                <ClearInputButton />
            </View>
            <UseMyLocationButton />
        </View>
    </Modal>;
};

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);
