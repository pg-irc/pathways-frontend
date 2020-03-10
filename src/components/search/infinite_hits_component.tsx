// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { Id } from '../../stores/services';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View } from 'native-base';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { EmptyComponent as EmptySearchComponent } from './empty_component';
import { useOnlineStatus, OnlineStatus } from '../../hooks/use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { LatLong } from '../../validation/latlong/types';

export interface InfiniteHitsProps {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly searchResults: ReadonlyArray<any>;
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

export type InfiniteHitsAndStateResultsProps = InfiniteHitsProps & InfiniteHitsActions;

export const InfiniteHitsComponent = (props: Partial<InfiniteHitsAndStateResultsProps>): JSX.Element => {
    useTraceUpdate('InfiniteHitsComponent', props);
    const onlineStatus = useOnlineStatus();

    if (searchTermIsEmpty(props.searchTerm)) {
        return renderEmptyComponent(props.showPartialLocalizationMessage, props.hidePartialLocalizationMessage);
    }

    if (isSearchErrorType(onlineStatus, props.searchResults, props.latLong)) {
        return renderErrorComponent(props, onlineStatus, props.searchResults);
    }

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            {renderLoadingScreen(props.isLatLongLoading)}
            <FlatList
                style={{ backgroundColor: colors.white }}
                refreshing={false}
                data={props.searchResults}
                keyExtractor={keyExtractor}
                renderItem={renderSearchHit(props)}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={renderHeader(props.showPartialLocalizationMessage, props.hidePartialLocalizationMessage)}
            />
        </View>
    );
};

const renderLoadingScreen = (isLatLongLoading: boolean): JSX.Element => {
    if (!isLoading(isLatLongLoading)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <LoadingServiceListComponent />
        </View>
    );
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

const isLoading = (isLatLongLoading: boolean): boolean => (
    isLatLongLoading
);

const isSearchErrorType = (onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>, latLong: LatLong): boolean => (
    isOffline(onlineStatus) || hasNoResultsFromSearchTermQuery(searchResults) || hasNoResultsFromLocationQuery(latLong)
);

const renderErrorComponent =
(props: Partial<InfiniteHitsAndStateResultsProps>, onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>): JSX.Element => {
    if (isOffline(onlineStatus)) {
        return renderComponentByErrorType(props, Errors.Offline);
    }
    if (hasNoResultsFromSearchTermQuery(searchResults)) {
        return renderComponentByErrorType(props, Errors.NoMatchingSearchResults);
    }
    if (hasNoResultsFromLocationQuery(props.latLong)) {
        return renderComponentByErrorType(props, Errors.InvalidSearchLocation);
    }
    return renderComponentByErrorType(props, Errors.Exception);
};

const renderComponentByErrorType = (props: Partial<InfiniteHitsAndStateResultsProps>, errorType: Errors): JSX.Element => (
    <ErrorScreenSwitcherComponent
        refreshScreen={undefined}
        errorType={errorType}
        header={renderHeader(props.showPartialLocalizationMessage, props.hidePartialLocalizationMessage)}
    />
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

const renderEmptyComponent =
(showPartialLocalizationMessage: boolean, hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction): JSX.Element => (
    <EmptySearchComponent
        header={renderHeader(showPartialLocalizationMessage, hidePartialLocalizationMessage)}
    />
);

const renderHeader =
(showPartialLocalizationMessage: boolean, hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction): JSX.Element => (
    <MessageComponent
        isVisible={showPartialLocalizationMessage}
        hidePartialLocalizationMessage={hidePartialLocalizationMessage}
    />
);