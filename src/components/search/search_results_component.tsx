// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { colors, values, textStyles } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../application/helpers/use_trace_update';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { Id } from '../../stores/services';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { EmptyComponent as EmptySearchComponent } from './empty_component';
import { OnlineStatus } from './use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { LatLong } from '../../validation/latlong/types';

export interface SearchResultsProps {
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly showPartialLocalizationMessage: boolean;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly isLoading: boolean;
    readonly searchPage: number;
    readonly numberOfSearchPages: number;
    readonly onlineStatus: OnlineStatus;
}

export interface SearchResultsActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
    readonly onSearchRequest: (searchTerm: string, location: string) => Promise<void>;
    readonly onLoadMore: () => Promise<void>;
}

type Props = SearchResultsProps & SearchResultsActions & RouterProps;

export const SearchResultsComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchResultsComponent', props);

    if (searchTermIsEmpty(props)) {
        return renderEmptyComponent(props);
    }

    if (isSearchErrorType(props)) {
        return renderErrorComponent(props);
    }
    return renderComponentWithResults(props);
};

const renderComponentWithResults = (props: Props): JSX.Element => (
    <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
        {renderLoadingScreen(props.isLoading)}
        <FlatList
            style={{ backgroundColor: colors.white }}
            refreshing={false}
            data={props.searchResults}
            keyExtractor={keyExtractor}
            renderItem={renderSearchHit(props)}
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={renderHeader(props)}
            ListFooterComponent={renderLoadMoreButton(props.searchPage, props.numberOfSearchPages, props.onLoadMore)}
        />
    </View>
);

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);

const renderSearchHit = R.curry((props: Props, itemInfo: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
    const item: SearchServiceData = itemInfo.item;
    const service: HumanServiceData = toHumanServiceData(item, props.bookmarkedServicesIds);
    const onPress = (): void => {
        props.saveService(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
    };

    const onBookmark = (): BookmarkServiceAction => props.bookmarkService(service);
    const onUnbookmark = (): UnbookmarkServiceAction => props.unbookmarkService(service);
    return (
        <ServiceListItemComponent
            service={service}
            history={props.history}
            onPress={onPress}
            isBookmarked={service.bookmarked}
            onBookmark={onBookmark}
            onUnbookmark={onUnbookmark}
        />
    );
});

const renderLoadingScreen = (isLoading: boolean): JSX.Element => {
    if (!isLoading) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <LoadingServiceListComponent />
        </View>
    );
};

const searchTermIsEmpty = (props: Props): boolean => (
    !props.searchTerm && props.onlineStatus !== OnlineStatus.Offline && props.searchResults.length === 0
);

const isSearchErrorType = (props: Props): boolean => {
    if (props.isLoading) {
        return false;
    }
    return (
        isOffline(props.onlineStatus) || hasNoResultsFromSearchTermQuery(props.searchResults) || hasNoResultsFromLocationQuery(props.searchLatLong)
    );
};

const renderErrorComponent = (props: Props): JSX.Element => {
    if (isOffline(props.onlineStatus)) {
        return renderComponentByErrorType(props, Errors.Offline);
    }
    if (hasNoResultsFromSearchTermQuery(props.searchResults)) {
        return renderComponentByErrorType(props, Errors.NoMatchingSearchResults);
    }
    if (hasNoResultsFromLocationQuery(props.searchLatLong)) {
        return renderComponentByErrorType(props, Errors.InvalidSearchLocation);
    }
    return renderComponentByErrorType(props, Errors.Exception);
};

const renderComponentByErrorType = (props: Props, errorType: Errors): JSX.Element => (
    <ErrorScreenSwitcherComponent
        refreshScreen={(): Promise<void> => props.onSearchRequest(props.searchTerm, props.searchLocation)}
        errorType={errorType}
        header={renderHeader(props)}
    />
);

const isOffline = (onlineStatus: OnlineStatus): boolean => (
    onlineStatus === OnlineStatus.Offline
);

const hasNoResultsFromSearchTermQuery = (searchResults: ReadonlyArray<SearchServiceData>): boolean => (
    searchResults.length === 0
);

const hasNoResultsFromLocationQuery = (latLong?: LatLong): boolean => (
    latLong && latLong.lat === 0 && latLong.lng === 0
);

const renderEmptyComponent = (props: Props): JSX.Element => (
    <EmptySearchComponent
        header={renderHeader(props)}
    />
);

const renderHeader = (props: Props): JSX.Element => (
    <MessageComponent
        isVisible={props.showPartialLocalizationMessage}
        hidePartialLocalizationMessage={props.hidePartialLocalizationMessage}
    />
);

const renderLoadMoreButton = (searchPage: number, numberOfPages: number, onLoadMore: () => Promise<void>): JSX.Element => {
    if (searchPage + 1 >= numberOfPages) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ backgroundColor: colors.lightGrey }}>
            <Button
                onPress={onLoadMore}
                style={{
                    backgroundColor: colors.teal,
                    borderRadius: values.roundedBorderRadius,
                    justifyContent: 'center',
                    marginVertical: 16,
                    marginHorizontal: 24,
                }} >
                <Text style={textStyles.button} uppercase={false}><Trans>Show more services</Trans></Text>
            </Button>
        </View>);
};
