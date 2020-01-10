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
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import algoliasearch from 'algoliasearch/lite';
import { SaveSearchTermAction, SaveSearchLocationAction } from '../../stores/search';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly saveSearchTerm: (searchTerm: string) => SaveSearchTermAction;
    readonly saveSearchLocation: (searchLocation: string) => SaveSearchLocationAction;
}

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);

    const [location, setLocation]: [string, (s: string) => void] = useState(props.searchLocation);
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);

    useEffect(() => {
        props.saveSearchLocation(location);
    }, [location]);

    useFetchLatLongFromLocation(location, setLatLong);
    useDisableAnalyticsOnEasterEgg(location, props.disableAnalytics);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);
    const searchClient = algoliasearch(
        props.appId,
        props.apiKey,
    );
    return <I18n>{(): JSX.Element => {

        return <Content style={{ backgroundColor: colors.pale }} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag'>
            <InstantSearch indexName={servicesIndex()} searchClient={searchClient} {...props} >
                <SearchInputConnectedComponent
                    latLong={latLong}
                    searchTerm={props.searchTerm}
                    saveSearchTerm={props.saveSearchTerm}
                    location={location}
                    setLocation={setLocation} />
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