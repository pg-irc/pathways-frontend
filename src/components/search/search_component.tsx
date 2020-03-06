// tslint:disable:no-expression-statement
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { InstantSearch, connectInfiniteHits, connectConfigure, connectSearchBox, connectStateResults } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
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
import { DisableAnalyticsAction, HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import { SaveSearchTermAction, SaveSearchLocationAction, SetIsInputCollapsedAction, SaveSearchLatLongAction } from '../../stores/search';
import { searchClient } from './api/search_client';
import { InfiniteHitsAndStateResultsProps } from './infinite_hits_component';

export interface SearchComponentProps {
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly isSearchInputCollapsed: boolean;
    readonly searchLatLong: LatLong;
    readonly showPartialLocalizationMessage: boolean;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly saveSearchTerm: (searchTerm: string) => SaveSearchTermAction;
    readonly saveSearchLocation: (searchLocation: string) => SaveSearchLocationAction;
    readonly saveSearchLatLong: (searchLatLong: LatLong) => SaveSearchLatLongAction;
    readonly setIsSearchInputCollapsed: (isSearchInputCollapsed: boolean) => SetIsInputCollapsedAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

export type SetIsLatLongLoading = Dispatch<SetStateAction<boolean>>;
export type SetIsInputCollapsed = Dispatch<SetStateAction<boolean>>;

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);

    const [location, setLocation]: readonly [string, (s: string) => void] = useState(props.searchLocation);
    const [isLatLongLoading, setIsLatLongLoading]: readonly [boolean, SetIsLatLongLoading] = useState(false);

    useEffect((): void => {
        props.saveSearchLocation(location);
        if (location === '') {
            props.saveSearchLatLong(undefined);
        }
    }, [location]);

    useFetchLatLongFromLocation(location, props.saveSearchLatLong, setIsLatLongLoading);
    useDisableAnalyticsOnEasterEgg(location, props.disableAnalytics);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure((): JSX.Element => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(connectStateResults(
        (infiniteHitsAndStateResultsProps: InfiniteHitsAndStateResultsProps) =>
            <InfiniteHitsComponent {...infiniteHitsAndStateResultsProps} latLong={props.searchLatLong} isLatLongLoading={isLatLongLoading} />,
    ),
    );

    return <I18n>{(): JSX.Element => {

        return <View style={{ backgroundColor: colors.pale, flex: 1 }}>
            <InstantSearch indexName={servicesIndex()} searchClient={searchClient} {...props} >
                <SearchInputConnectedComponent
                    searchLatLong={props.searchLatLong}
                    searchTerm={props.searchTerm}
                    saveSearchTerm={props.saveSearchTerm}
                    location={location}
                    setLocation={setLocation}
                    isSearchInputCollapsed={props.isSearchInputCollapsed}
                    setIsSearchInputCollapsed={props.setIsSearchInputCollapsed}
                />
                <ConfigureConnectedComponent {...toServiceSearchConfiguration(props.searchLatLong)} />
                <InfiniteHitsConnectedComponent {...props} />
            </InstantSearch>
        </View>;
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