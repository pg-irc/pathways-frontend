// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { InstantSearch, connectInfiniteHits, connectConfigure, connectSearchBox } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/latlong/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { I18n } from '@lingui/react';
import { SearchTermAndLocationComponent } from './search_term_and_location_component';
import { ReactI18nRenderProp } from '../../locale/types';
import { MODAL_NONE, MODAL_SEARCH_TERM, MODAL_LOCATION, USE_MY_LOCATION } from './constants';
import { SearchTermInputModal } from './search_term_input_modal';
import { LocationInputModal } from './location_input_modal';
import { localizedPlaceHolders } from './localized_place_holders';
import { RouterProps } from '../../application/routing';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
}

type Props = SearchComponentProps & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('SearchComponent', props);

    const [modalState, setModalState]: [string, (s: string) => void] = useState(MODAL_NONE);
    const [searchTerm, setSearchTerm]: [string, (s: string) => void] = useState('');
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    // tslint:disable-next-line:no-expression-statement
    useFetchLatLongFromLocation(location, setLatLong);

    const ConnectedSearchTermInputModal = connectSearchBox(SearchTermInputModal);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <I18n>{(reactI18nRenderProp: ReactI18nRenderProp): JSX.Element => {
        const placeholderStrings = localizedPlaceHolders(reactI18nRenderProp);

        return <Content style={{ backgroundColor: colors.pale }}>
            <InstantSearch indexName={servicesIndex()} {...props} >
                <ConnectedSearchTermInputModal
                    visible={modalState === MODAL_SEARCH_TERM}
                    placeholder={placeholderStrings.searchTermPlaceHolder}
                    onEndEditing={(newSearchTerm: string): void => {
                        setModalState(MODAL_NONE);
                        setSearchTerm(newSearchTerm);
                    }} />

                <LocationInputModal
                    visible={modalState === MODAL_LOCATION}
                    placeholder={placeholderStrings.locationPlaceHolder}
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
                    searchTermPlaceHolder={placeholderStrings.searchTermPlaceHolder}
                    location={location}
                    locationPlaceHolder={placeholderStrings.locationPlaceHolder}
                    openSearchTermInput={(): void => { setModalState(MODAL_SEARCH_TERM); }}
                    openLocationInput={(): void => { setModalState(MODAL_LOCATION); }}
                />
                <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
                <InfiniteHitsConnectedComponent {...props} />
            </InstantSearch>
        </Content>;
    }}</I18n>;
};

const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);
