// tslint:disable:no-expression-statement
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { LatLong } from '../../validation/latlong/types';
import { useTraceUpdate } from '../../helpers/debug';
import { I18n } from '@lingui/react';
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction, HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import { SaveSearchTermAction, SaveSearchLocationAction, SetIsInputCollapsedAction, SaveSearchResultsAction } from '../../stores/search';
import { fetchSearchResultsFromQuery } from './api/fetch_search_results_from_query';
import { fetchLatLongFromLocation } from './api/fetch_lat_long_from_location';
import { useOnlineStatus } from '../../hooks/use_online_status';
import { SearchServiceData } from '../../validation/search/types';

export interface SearchComponentProps {
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly isSearchInputCollapsed: boolean;
    readonly showPartialLocalizationMessage: boolean;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly saveSearchTerm: (searchTerm: string) => SaveSearchTermAction;
    readonly saveSearchLocation: (searchLocation: string) => SaveSearchLocationAction;
    readonly saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>) => SaveSearchResultsAction;
    readonly setIsSearchInputCollapsed: (isSearchInputCollapsed: boolean) => SetIsInputCollapsedAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

export type SetIsLatLongLoading = Dispatch<SetStateAction<boolean>>;
export type SetIsInputCollapsed = Dispatch<SetStateAction<boolean>>;
// tslint:disable-next-line: no-any
export type SetHits = Dispatch<SetStateAction<ReadonlyArray<any>>>;

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);

    const [location, setLocation]: readonly [string, (s: string) => void] = useState(props.searchLocation);
    const [latLong, setLatLong]: readonly [LatLong, (latLong: LatLong) => void] = useState(undefined);
    // tslint:disable-next-line: no-any
    const onlineStatus = useOnlineStatus();

    useDisableAnalyticsOnEasterEgg(location, props.disableAnalytics);

    const onSearchPress = async (searchTerm: string, location: string): Promise<void> => {
        props.saveSearchTerm(searchTerm);
        const geocoderLatLong = await fetchLatLongFromLocation(location, onlineStatus);
        const searchResults = await fetchSearchResultsFromQuery(searchTerm, geocoderLatLong);
        props.saveSearchResults(searchResults);
    };

    return <I18n>{(): JSX.Element => {

        return <View style={{ backgroundColor: colors.pale, flex: 1 }}>
                <SearchInputComponent
                    latLong={latLong}
                    searchTerm={props.searchTerm}
                    saveSearchTerm={props.saveSearchTerm}
                    location={location}
                    setLocation={setLocation}
                    isSearchInputCollapsed={props.isSearchInputCollapsed}
                    setIsSearchInputCollapsed={props.setIsSearchInputCollapsed}
                    onSearchPress={onSearchPress}
                />
                <InfiniteHitsComponent {...props} />
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