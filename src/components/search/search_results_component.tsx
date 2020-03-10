// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { colors } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { Id } from '../../stores/services';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View } from 'native-base';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { EmptyComponent as EmptySearchComponent } from './empty_component';
import { useOnlineStatus, OnlineStatus } from '../../hooks/use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';

export interface SearchResultsProps {
    // tslint:disable-next-line:no-any
    readonly searchResults: ReadonlyArray<any>;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly showPartialLocalizationMessage: boolean;
    readonly searchTerm: string;
}

export interface SearchResultsActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

type Props = SearchResultsProps & SearchResultsActions & RouterProps;

export const SearchResultsComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchResultsComponent', props);
    const onlineStatus = useOnlineStatus();

    if (searchTermIsEmpty(props.searchTerm)) {
        return renderEmptyComponent(props.showPartialLocalizationMessage, props.hidePartialLocalizationMessage);
    }

    if (isSearchErrorType(onlineStatus, props.searchResults)) {
        return renderErrorComponent(props, onlineStatus, props.searchResults);
    }

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
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
    return (
        <ServiceListItemComponent
            service={service}
            history={props.history}
            currentPath={props.location.pathname}
            onPress={onPress}
        />
    );
});

const searchTermIsEmpty = (searchTerm: string): boolean => (
    !searchTerm
);

const isSearchErrorType = (onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>): boolean => (
    isOffline(onlineStatus) || hasNoResultsFromSearchTermQuery(searchResults)
);

const renderErrorComponent =
(props: Partial<Props>, onlineStatus: OnlineStatus, searchResults: ReadonlyArray<SearchServiceData>): JSX.Element => {
    if (isOffline(onlineStatus)) {
        return renderComponentByErrorType(props, Errors.Offline);
    }
    if (hasNoResultsFromSearchTermQuery(searchResults)) {
        return renderComponentByErrorType(props, Errors.NoMatchingSearchResults);
    }
    return renderComponentByErrorType(props, Errors.Exception);
};

const renderComponentByErrorType = (props: Partial<Props>, errorType: Errors): JSX.Element => (
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