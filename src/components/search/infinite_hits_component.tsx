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
    useTraceUpdate('InfiniteHitsComponent', props);
    const searchResults = getValidSearchResults(props);
    const loadMoreButton = renderLoadMoreButton(props.hasMore, props.refineNext);
    const onlineStatus = useOnlineStatus();
    const refreshSearchServices = (): string => (
        props.refine()
    );
    const latLong = props.latLong;
    const showPartialLocalizationMessage = props.showPartialLocalizationMessage;
    const hidePartialLocalizationMessage = props.hidePartialLocalizationMessage;
    const searching = props.searching;

    if (searchTermIsEmpty(props.searchTerm)) {
        return renderEmptyComponent(showPartialLocalizationMessage, hidePartialLocalizationMessage);
    }

    if (isSearchErrorType(onlineStatus, searchResults, latLong, searching)) {
        const searchErrorProps = {
            onlineStatus,
            searchResults,
            latLong,
            showPartialLocalizationMessage,
            hidePartialLocalizationMessage,
            refreshSearchServices,
            searching,
        };
        return renderErrorComponent(searchErrorProps);
    }

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            {renderLoadingScreen(props.searching, props.isLatLongLoading)}
            <FlatList
                style={{ backgroundColor: colors.white }}
                refreshing={false}
                data={searchResults}
                keyExtractor={keyExtractor}
                renderItem={renderSearchHit(props)}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={renderHeader(showPartialLocalizationMessage, hidePartialLocalizationMessage)}
                ListFooterComponent={loadMoreButton}
            />
        </View>
    );
};

const renderLoadingScreen = (searching: boolean, isLatLongLoading: boolean): JSX.Element => {
    if (!isLoading(searching, isLatLongLoading)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <LoadingServiceListComponent />
        </View>
    );
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
    return (
        <ServiceListItemComponent
            service={service}
            history={props.history}
            currentPath={props.currentPath}
            onPress={onPress}
        />
    );
});

const searchTermIsEmpty = (searchTerm: string): boolean => (
    !searchTerm
);

const isLoading = (searching: boolean, isLatLongLoading: boolean): boolean => (
    searching || isLatLongLoading
);

const isSearchErrorType =
(onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong, searching: boolean): boolean => (
    isOffline(onlineStatus) || hasNoResultsFromSearchTermQuery(searchResults, searching) || hasNoResultsFromLocationQuery(latLong)
);

const isOffline = (onlineStatus: OnlineStatus): boolean => (
    onlineStatus === OnlineStatus.Offline
);

const hasNoResultsFromSearchTermQuery = (searchResults: ReadonlyArray<SearchServiceData>, searching: boolean): boolean => (
    searchResults.length === 0 && !searching
);

const hasNoResultsFromLocationQuery = (latLong: LatLong): boolean => (
   latLong && latLong.lat === 0 && latLong.lng === 0
);

const renderEmptyComponent =
(showPartialLocalizationMessage: boolean, hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction): JSX.Element => (
    <EmptySearchComponent
        header={renderHeader(showPartialLocalizationMessage, hidePartialLocalizationMessage)}
    />
);

export interface SearchErrorComponentProps {
    readonly onlineStatus: OnlineStatus;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly latLong: LatLong;
    readonly showPartialLocalizationMessage: boolean;
    readonly searching: boolean;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
    readonly refreshSearchServices: () => void;
}

const renderErrorComponent = (props: SearchErrorComponentProps): JSX.Element => (
    <ErrorComponent
        errorType={determineErrorType(props.onlineStatus, props.searchResults, props.latLong, props.searching)}
        refreshScreen={props.refreshSearchServices}
        header={renderHeader(props.showPartialLocalizationMessage, props.hidePartialLocalizationMessage)}
    />
);

const ErrorComponent = (props: { readonly errorType: Errors, readonly refreshScreen: () => void, readonly header: JSX.Element }): JSX.Element => (
    <ErrorScreenSwitcherComponent
        refreshScreen={props.refreshScreen}
        errorType={props.errorType}
        header={props.header}
    />
);

const determineErrorType =
(onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong, searching: boolean): Errors => {
    if (isOffline(onlineStatus)) {
        return Errors.Offline;
    }
    if (hasNoResultsFromSearchTermQuery(searchResults, searching)) {
        return Errors.NoMatchingSearchResults;
    }
    if (hasNoResultsFromLocationQuery(latLong)) {
        return Errors.InvalidSearchLocation;
    }
    return Errors.Exception;
};

const renderHeader =
(showPartialLocalizationMessage: boolean, hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction): JSX.Element => (
    <MessageComponent
        isVisible={showPartialLocalizationMessage}
        hidePartialLocalizationMessage={hidePartialLocalizationMessage}
    />
);