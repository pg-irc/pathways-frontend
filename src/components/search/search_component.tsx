// tslint:disable:no-expression-statement
import React, { useState, useEffect } from 'react';
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
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
}

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);

    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    useFetchLatLongFromLocation(location, setLatLong);
    useDisableAnalyticsOnEasterEgg(location, props.disableAnalytics);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <I18n>{(): JSX.Element => {

        return <Content style={{ backgroundColor: colors.pale }}>
            <InstantSearch indexName={servicesIndex()} {...props} >

                <SearchInputConnectedComponent location={location} setLocation={setLocation} latLong={latLong} />
                <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
                <InfiniteHitsConnectedComponent {...props} />
            </InstantSearch>
        </Content>;
    }}</I18n>;
};

const useDisableAnalyticsOnEasterEgg = (location: string, disableAnalytics: (disable: boolean) => DisableAnalyticsAction): void => {
    const effect = (): void => {
        if (location === DISABLE_ANALYTICS_STRING) {
            disableAnalytics(true);
            alert('Analytics disabled');
        } else if (location === ENABLE_ANALYTICS_STRING) {
            disableAnalytics(false);
            alert('Analytics enabled');
        }
    };
    useEffect(effect, [location]);
};
const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);
