// tslint:disable:no-expression-statement
import React, { useContext, useRef, useEffect } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { colors, values, textStyles } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { Id } from '../../stores/services';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { MessageComponent } from '../partial_localization/message_component';
import { EmptyComponent as EmptySearchComponent } from './empty_component';
import { OnlineStatus } from './use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { LatLong } from '../../validation/latlong/types';
import { openURL } from '../link/link_component';
import buildUrl from 'build-url';
import { VERSION } from 'react-native-dotenv';
import Animated from 'react-native-reanimated';
import { ScrollContext, ScrollAnimationContext } from '../main//scroll_animation_context';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface SearchResultsProps {
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly isLoading: boolean;
    readonly searchPage: number;
    readonly numberOfSearchPages: number;
    readonly scrollOffset: number;
    readonly searchOffset: number;
    readonly onlineStatus: OnlineStatus;
}

export interface SearchResultsActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly setScrollOffset: (index: number) => void;
    readonly saveSearchOffset: (index: number) => void;
    readonly onSearchRequest: (searchTerm: string, location: string) => Promise<void>;
    readonly onLoadMore: () => Promise<void>;
}

type Props = SearchResultsProps & SearchResultsActions & RouterProps;

export const SearchResultsComponent = (props: Props): JSX.Element => {
    if (searchTermIsEmpty(props)) {
        return renderEmptyComponent();
    }

    if (isSearchErrorType(props)) {
        return renderErrorComponent(props);
    }
    return renderComponentWithResults(props);
};

const renderComponentWithResults = (props: Props): JSX.Element => {
    const flatListRef = useRef<any>();
    const {
        onAnimatedScrollHandler,
        runInterpolations,
        pauseInterpolations,
    }: ScrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

    useEffect((): void => {
        if (props.searchTerm) {
            flatListRef.current.getNode().scrollToOffset({ animated: false, offset: 0 });
        }
    }, [props.searchTerm, props.searchLocation]);

    useEffect((): void => {
        if (props.searchResults.length > 0) {
            flatListRef.current.getNode().scrollToOffset({ animated: false, offset: props.searchOffset });
        }
    }, [props.searchOffset]);

    const onScrollBeginDrag = (): void => {
        runInterpolations();
    };

    const onScrollEndDrag = (e: any): void => {
        pauseInterpolations();
        props.setScrollOffset(e.nativeEvent.contentOffset.y);
    };

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            {renderLoadingScreen(props.isLoading)}
            <AnimatedFlatList
                bounces={false}
                ref={flatListRef}
                onScrollBeginDrag={onScrollBeginDrag}
                onScroll={onAnimatedScrollHandler}
                onScrollEndDrag={onScrollEndDrag}
                initialNumToRender={props.searchOffset ? props.searchResults.length : 20}
                style={{ backgroundColor: colors.lightGrey, flex: 1 }}
                data={props.searchResults}
                keyExtractor={keyExtractor}
                renderItem={renderSearchHit(props)}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={<ListHeaderComponent />}
                ListFooterComponent={renderLoadMoreButton(props.searchPage, props.numberOfSearchPages, props.onLoadMore)}
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
        props.saveSearchOffset(props.scrollOffset);
        props.openServiceDetail(service);
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
        header={<ListHeaderComponent />}
    />
);

const isOffline = (onlineStatus: OnlineStatus): boolean => (
    onlineStatus === OnlineStatus.Offline
);

const hasNoResultsFromSearchTermQuery = (searchResults: ReadonlyArray<SearchServiceData>): boolean => (
    searchResults.length === 0
);

export const hasNoResultsFromLocationQuery = (latLong?: LatLong): boolean => (
    latLong && latLong.lat === 0 && latLong.lng === 0
);

const renderEmptyComponent = (): JSX.Element => (
    <EmptySearchComponent
        header={<ListHeaderComponent />}
    />
);

const ListHeaderComponent = (): JSX.Element => {
    const messageText = (
        <>
            <Trans>
                Search is currently in beta and only available in English. For support in other languages, please
                </Trans> <Text onPress={(): void => openURL('tel: 211')} style={textStyles.messageLink}>
                <Trans>call BC211.</Trans></Text>
        </>
    );
    const linkText = <Trans>Give feedback</Trans>;
    const onLinkPress = (): void => openURL(buildUrl(
        'mailto:info@arrivaladvisor.ca',
        { queryParams: { subject: 'Arrival Advisor - Feedback on Search', body: `Version number: ${VERSION}.` } },
    ));
    return (
        <MessageComponent
            isVisible={true}
            messageText={messageText}
            linkText={linkText}
            onLinkPress={onLinkPress}
        />
    );
};

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
