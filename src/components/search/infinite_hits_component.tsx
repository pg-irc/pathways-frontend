// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values, textStyles } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { validateServiceSearchResponse } from '../../validation/search';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { Id } from '../../stores/services';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { EmptyComponent as EmptySearchComponent } from './empty_component';
import { useOnlineStatus, OnlineStatus } from '../../hooks/use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { StateResultsProvided } from 'react-instantsearch-core';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { LatLong } from '../../validation/latlong/types';

export interface InfiniteHitsProps {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
    readonly refine: (searchTerms?: string) => string;
    readonly refineNext: () => void;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly showPartialLocalizationMessage: boolean;
    readonly searchTerm: string;
    readonly latLong: LatLong;
    readonly isLatLongLoading: boolean;
}

export interface InfiniteHitsActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

export type InfiniteHitsAndStateResultsProps = InfiniteHitsProps & InfiniteHitsActions & StateResultsProvided;

export const InfiniteHitsComponent = (props: Partial<InfiniteHitsAndStateResultsProps>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const searchResults = getValidSearchResults(props);
    const loadMoreButton = renderLoadMoreButton(props.hasMore, props.refineNext);
    const onlineStatus = useOnlineStatus();
    const refreshSearchServices = (): string => (
        props.refine()
    );

    const ServiceList = (
        <FlatList
            style={{ backgroundColor: colors.white }}
            refreshing={false}
            data={searchResults}
            keyExtractor={keyExtractor}
            renderItem={renderSearchHit(props)}
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={
                <MessageComponent
                    isVisible={props.showPartialLocalizationMessage}
                    hidePartialLocalizationMessage={props.hidePartialLocalizationMessage}
                />
            }
            ListFooterComponent={loadMoreButton} />
    );

    if (searchTermIsEmpty(props.searchTerm)) {
        return <EmptySearchComponent />;
    }

    if (isLoading(props.searching, props.isLatLongLoading)) {
        return <LoadingServiceListComponent />;
    }

    if (isSearchErrorType(onlineStatus, searchResults, props.latLong)) {
        return renderErrorComponent(onlineStatus, searchResults, props.latLong, (): string => refreshSearchServices());
    }

    return <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>{ServiceList}</View>;
};

const renderLoadMoreButton = (hasMore: boolean, refineNext: () => void): JSX.Element => {
    if (hasMore) {
        return (
            <View style={{ backgroundColor: colors.lightGrey }}>
                <Button onPress={refineNext} style={{
                    backgroundColor: colors.teal,
                    borderRadius: values.roundedBorderRadius,
                    justifyContent: 'center',
                    marginVertical: 16,
                    marginHorizontal: 24,
                }} >
                    <Text style={textStyles.button} uppercase={false}><Trans>Show more services</Trans></Text>
                </Button>
            </View>);
    }
    return <EmptyComponent />;
};

const getValidSearchResults = (props: Partial<InfiniteHitsAndStateResultsProps>): ReadonlyArray<SearchServiceData> => {
    const validationResult = validateServiceSearchResponse(props.hits);
    if (!validationResult.isValid) {
        throw new Error(validationResult.errors);
    }
    return validationResult.validData;
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);

const renderSearchHit = R.curry((props: Partial<InfiniteHitsAndStateResultsProps>, itemInfo: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
    const item: SearchServiceData = itemInfo.item;
    const service: HumanServiceData = toHumanServiceData(item, props.bookmarkedServicesIds);
    const onPress = (): void => {
        props.saveService(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
    };
    return <ServiceListItemComponent
        service={service}
        history={props.history}
        currentPath={props.currentPath}
        onPress={onPress}
        isBookmarked={R.contains(item.service_id, props.bookmarkedServicesIds)}
        bookmarkService={props.bookmarkService}
        unbookmarkService={props.unbookmarkService}
    />;
});

const searchTermIsEmpty = (searchTerm: string): boolean => (
    !searchTerm
);

const isLoading = (searching: boolean, isLatLongLoading: boolean): boolean => (
    searching || isLatLongLoading
);

const isSearchErrorType = (onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong): boolean => (
    isOffline(onlineStatus) || hasNoResultsFromSearchTermQuery(searchResults) || hasNoResultsFromLocationQuery(latLong)
);

const isOffline = (onlineStatus: OnlineStatus): boolean => (
    onlineStatus === OnlineStatus.Offline
);

const hasNoResultsFromSearchTermQuery = (searchResults: ReadonlyArray<SearchServiceData>): boolean => (
    searchResults.length === 0
);

const hasNoResultsFromLocationQuery = (latLong: LatLong): boolean => (
   latLong && latLong.lat === 0 && latLong.lng === 0
);

const renderErrorComponent =
(onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong, refreshServices: () => void): JSX.Element => (
    <ErrorComponent
        errorType={determineErrorType(onlineStatus, searchResults, latLong)}
        refreshScreen={refreshServices}
    />
);

const ErrorComponent = (props: { readonly errorType: Errors, readonly refreshScreen: () => void }): JSX.Element => (
    <ErrorScreenSwitcherComponent
        refreshScreen={props.refreshScreen}
        errorType={props.errorType}
    />
);

const determineErrorType = (onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong): Errors => {
    if (isOffline(onlineStatus)) {
        return Errors.Offline;
    }

    if (hasNoResultsFromSearchTermQuery(searchResults)) {
        return Errors.NoMatchingSearchResults;
    }

    if (hasNoResultsFromLocationQuery(latLong)) {
        return Errors.InvalidSearchLocation;
    }
    return Errors.Exception;
};
