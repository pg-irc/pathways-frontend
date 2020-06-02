// tslint:disable:no-expression-statement
import React, { useContext, useEffect, Dispatch, SetStateAction, useState, EffectCallback } from 'react';
import { SearchResultsComponent } from './search_results_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { View, Text, Header, Left, Right } from 'native-base';
import { useTraceUpdate } from '../../application/helpers/use_trace_update';
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import * as actions from '../../stores/search';
import { SearchExecutedAction } from '../../stores/analytics';
import { fetchSearchResultsFromQuery } from './api/fetch_search_results_from_query';
import { fetchLatLongFromLocation } from '../../api/fetch_lat_long_from_location';
import { useOnlineStatus } from './use_online_status';
import { SearchServiceData } from '../../validation/search/types';
import { LatLong } from '../../validation/latlong/types';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { Trans } from '@lingui/react';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import Animated from 'react-native-reanimated';
import { ScrollContext, ScrollAnimationContext } from '../main/scroll_animation_context';
import { SaveSearchOffsetAction } from '../../stores/list_offset';

export interface SearchComponentProps {
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly searchPage: number;
    readonly numberOfSearchPages: number;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly collapseSearchInput: boolean;
    readonly searchOffset: number;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly saveSearchTerm: (searchTerm: string) => actions.SaveSearchTermAction;
    readonly saveSearchLocation: (searchLocation: string) => actions.SaveSearchLocationAction;
    readonly saveSearchLatLong: (searchLatLong: LatLong) => actions.SaveSearchLatLongAction;
    readonly saveSearchPage: (searchPage: number) => actions.SaveSearchPageAction;
    readonly saveNumberOfSearchPages: (numberOfSearchPages: number) => actions.SaveNumberOfSearchPagesAction;
    readonly saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>) => actions.SaveSearchResultsAction;
    readonly setCollapseSearchInput: (collapseSearchInput: boolean) => actions.SetCollapseSearchInputAction;
    readonly searchExecuted: (searchTerm: string, searchLocation: string) => SearchExecutedAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveSearchOffset: (offset: number) => SaveSearchOffsetAction;
}

export type StringSetterFunction = Dispatch<SetStateAction<string>>;
export type BooleanSetterFunction = Dispatch<SetStateAction<boolean>>;

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);
    const scrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;
    const [isLoading, setIsLoading]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const onlineStatus = useOnlineStatus();
    useDisableAnalyticsOnEasterEgg(props.searchLocation, props.disableAnalytics);

    useEffect((): EffectCallback => {
        scrollAnimationContext.startScrollAnimation();

        return scrollAnimationContext.stopScrollAnimation;
    }, []);

    const onSearchRequest = async (searchTerm: string, location: string): Promise<void> => {
        props.setCollapseSearchInput(true);
        props.saveSearchTerm(searchTerm);
        props.saveSearchLocation(location);
        setIsLoading(true);
        // tslint:disable-next-line: no-let
        let geocoderLatLong = props.searchLatLong;
        try {
            if (props.searchLocation !== location) {
                geocoderLatLong = await fetchLatLongFromLocation(location);
                props.saveSearchLatLong(geocoderLatLong);
            }
            const searchTermWithCity = appendCityToSearchTerm(searchTerm, location);
            const searchResults = await fetchSearchResultsFromQuery(
                searchTermWithCity, props.searchPage, geocoderLatLong, props.saveNumberOfSearchPages);
            props.saveSearchResults(searchResults);
        } finally {
            setIsLoading(false);
            props.searchExecuted(searchTerm, location);
        }
    };

    const onLoadMore = async (): Promise<void> => {
        const searchTermWithCity = appendCityToSearchTerm(props.searchTerm, props.searchLocation);
        try {
            const moreResults = await fetchSearchResultsFromQuery(
                searchTermWithCity, props.searchPage + 1, props.searchLatLong, props.saveNumberOfSearchPages);
            props.saveSearchResults([...props.searchResults, ...moreResults]);
        } finally {
            props.saveSearchPage(props.searchPage + 1);
        }
    };

    const appendCityToSearchTerm = (searchTerm: string, location: string): string => {
        if (location.match('.*\\d.*') || location.match('My Location')) {
            return searchTerm;
        }
        return searchTerm + ' ' + location;
    };

    // tslint:disable-next-line: max-line-length
    const searchResultsProps = { ...props, isLoading, onlineStatus, onSearchRequest, onLoadMore };
    return (
        <View style={{ backgroundColor: colors.pale, flex: 1 }}>
            <SearchComponentHeader onMenuButtonPress={props.openHeaderMenu} />
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

const HeaderLeft = (): JSX.Element => (
    <Left style={applicationStyles.headerLeft}>
        <Text style={textStyles.headlineH5StyleWhiteLeft}><Trans>FIND A SERVICE</Trans></Text>
    </Left>
);

const HeaderRight = (props: { readonly onMenuButtonPress: () => void }): JSX.Element => (
    <Right style={applicationStyles.headerRight}>
        <MenuButtonComponent
            onPress={props.onMenuButtonPress}
            textColor={colors.white}
        />
    </Right>
);

const SearchComponentHeader = (props: { readonly onMenuButtonPress: () => void }): JSX.Element => {
    const { animatedHeaderHeight }: ScrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

    return (
        <Animated.View style={{ height: animatedHeaderHeight }}>
            <Header style={[applicationStyles.header, { backgroundColor: colors.teal }]}>
                <HeaderLeft />
                <HeaderRight onMenuButtonPress={props.onMenuButtonPress} />
            </Header>
        </Animated.View>
    );
};
