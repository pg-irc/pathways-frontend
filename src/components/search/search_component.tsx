// tslint:disable:no-expression-statement
import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { SearchResultsComponent } from './search_results_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction, HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import { SaveSearchTermAction, SaveSearchLocationAction, SetCollapseSearchInputAction, SaveSearchResultsAction, SaveSearchLatLongAction, SaveSearchPageAction } from '../../stores/search';
import { fetchSearchResultsFromQuery } from './api/fetch_search_results_from_query';
import { fetchLatLongFromLocation } from './api/fetch_lat_long_from_location';
import { useOnlineStatus } from '../../hooks/use_online_status';
import { SearchServiceData } from '../../validation/search/types';
import { LatLong } from '../../validation/latlong/types';

export interface SearchComponentProps {
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly searchPage: number;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly collapseSearchInput: boolean;
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
    readonly saveSearchPage: (searchPage: number) => SaveSearchPageAction;
    readonly saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>) => SaveSearchResultsAction;
    readonly setCollapseSearchInput: (collapseSearchInput: boolean) => SetCollapseSearchInputAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

export type StringSetterFunction = Dispatch<SetStateAction<string>>;
export type BooleanSetterFunction = Dispatch<SetStateAction<boolean>>;

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);
    const [isLoading, setIsLoading]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const [numberOfPages, setNumberOfPages]: readonly [number, (n: number) => void] = useState(1);
    const onlineStatus = useOnlineStatus();
    useDisableAnalyticsOnEasterEgg(props.searchLocation, props.disableAnalytics);

    const onSearchRequest = async (searchTerm: string, location: string): Promise<void> => {
        props.setCollapseSearchInput(true);
        props.saveSearchTerm(searchTerm);
        props.saveSearchLocation(location);
        setIsLoading(true);
        // tslint:disable-next-line: no-let
        let geocoderLatLong = props.searchLatLong;
        try {
            if (props.searchLocation !== location) {
                geocoderLatLong = await fetchLatLongFromLocation(location, onlineStatus);
                props.saveSearchLatLong(geocoderLatLong);
            }
            const searchResults = await fetchSearchResultsFromQuery(searchTerm, props.searchPage, geocoderLatLong, setNumberOfPages);
            props.saveSearchResults(searchResults);
        } finally {
            setIsLoading(false);
        }
    };

    const onLoadMore = async (): Promise<void> => {
        try {
            const moreResults = await fetchSearchResultsFromQuery(props.searchTerm, props.searchPage + 1, props.searchLatLong, setNumberOfPages);
            props.saveSearchResults([...props.searchResults, ...moreResults]);
        } finally {
            props.saveSearchPage(props.searchPage + 1);
        }
    };

    // tslint:disable-next-line: max-line-length
    const searchResultsProps = { ...props, isLoading, onlineStatus, numberOfPages, onSearchRequest, onLoadMore };
    return (
        <View style={{ backgroundColor: colors.pale, flex: 1 }}>
            <SearchInputComponent
                searchTerm={props.searchTerm}
                searchLocation={props.searchLocation}
                saveSearchTerm={props.saveSearchTerm}
                saveSearchLocation={props.saveSearchLocation}
                collapseSearchInput={props.collapseSearchInput}
                setCollapseSearchInput={props.setCollapseSearchInput}
                onSearchRequest={onSearchRequest}
            />
            <SearchResultsComponent {...searchResultsProps} />
        </View>
    );
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