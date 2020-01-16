// tslint:disable:no-expression-statement
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ListRenderItemInfo, FlatList, RefreshControl } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import * as Sentry from 'sentry-expo';
import { HumanServiceData, Id } from '../../validation/services/types';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/types';
import { ServiceListItemComponent } from './service_list_item_component';
import { BuildServicesRequestAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { textStyles, colors, values } from '../../application/styles';
import { isErrorSelectorTopicServices } from '../../selectors/services/is_error_selector_topic_services';
import * as constants from '../../application/constants';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { LatLong } from '../../validation/latlong/types';
import { getSentryMessageForError } from '../../validation/errors/sentry_messages';
import { Routes, RouterProps, goToRouteWithParameter } from '../../application/routing';
import * as R from 'ramda';
import { LoadingScreenComponent } from '../loading_screen/loading_screen_component';
import { emptyList } from '../../application/images';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation?: LatLong;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface ServiceListActions {
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation?: LatLong) => BuildServicesRequestAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater & RouterProps;

type Timestamp = number;
type TimestampSetter = Dispatch<SetStateAction<Timestamp>>;
type RefreshServicesAttemptedSetter = Dispatch<SetStateAction<boolean>>;

export const ServiceListComponent = (props: Props): JSX.Element => {
    const [lastScreenRefresh, setLastScreenRefresh]: readonly [Timestamp, TimestampSetter] = useState(Date.now());
    const [refreshServicesAttempted, setRefreshServicesAttempted]: readonly [boolean, RefreshServicesAttemptedSetter] = useState(false);
    useEffect(() => refreshServices(props, setRefreshServicesAttempted), [lastScreenRefresh]);
    if (isErrorSelectorTopicServices(props.topicServicesOrError)) {
        return (
            <ErrorComponent
                errorType={determineErrorType(props.topicServicesOrError)}
                refreshScreen={(): void => setLastScreenRefresh(Date.now())}
                title={props.topic.title}
            />
        );
    }

    return (
        <FlatList
            style={{ backgroundColor: colors.lightGrey }}
            refreshing={isLoadingServices(props.topicServicesOrError)}
            onRefresh={(): void => refreshServices(props, setRefreshServicesAttempted)}
            refreshControl={renderRefreshControl(isLoadingServices(props.topicServicesOrError))}
            data={getServicesIfValid(props.topicServicesOrError)}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceListItem(props)}
            ListEmptyComponent={renderEmptyOrLoadingComponent(props, refreshServicesAttempted, setLastScreenRefresh)}
            ListHeaderComponent={<ServiceListHeaderComponent title={props.topic.title} />}
        />
    );
};

const renderEmptyOrLoadingComponent = (props: Props, refreshServicesAttempted: boolean, setLastScreenRefresh: TimestampSetter): JSX.Element => {
    if (showEmptyComponent(props, refreshServicesAttempted)) {
        return (
            <EmptyListComponent
                title={<Trans>No services to show</Trans>}
                imageSource={emptyList}
                refreshScreen={(): void => setLastScreenRefresh(Date.now())}
            />
            );
    }
    return <LoadingScreenComponent />;
};

const refreshServices = (props: Props, setRefreshServicesAttempted: Dispatch<SetStateAction<boolean>> ): void => {
    if (servicesFetchRequired(props.topicServicesOrError)) {
        props.dispatchServicesRequest();
    }
    setRefreshServicesAttempted(true);
};

const servicesFetchRequired = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_ERROR ||
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID && topicServicesOrError.isExpired
);

const showEmptyComponent = (props: Props, refreshServicesAttempted: boolean): boolean => {
    if (refreshServicesAttempted) {
        if (isEmptyValidServices(props.topicServicesOrError)) {
            return true;
        }
    }
    return false;
};

const isEmptyValidServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID && topicServicesOrError.services.length <= 0
);

const ErrorComponent = (props: { readonly errorType: Errors, readonly refreshScreen: () => void, readonly title: string }): JSX.Element => {
    const sentryMessage = getSentryMessageForError(props.errorType, constants.SENTRY_SERVICES_LISTING_ERROR_CONTEXT);
    Sentry.captureMessage(sentryMessage);
    return (
        <ErrorScreenSwitcherComponent
            refreshScreen={props.refreshScreen}
            errorType={props.errorType}
            header={
                <ServiceListHeaderComponent title={props.title} />
            }
        />
    );
};

const determineErrorType = (topicServicesOrError: SelectorTopicServices): Errors => {
    if (isErrorSelectorTopicServices(topicServicesOrError)) {
        return topicServicesOrError.errorMessageType;
    }
    return Errors.Exception;
};

const getServicesIfValid = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<HumanServiceData> => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID && topicServicesOrError.services
);

const isLoadingServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_LOADING
);

export type ServiceItemInfo = ListRenderItemInfo<HumanServiceData>;

const renderServiceListItem = (props: Props): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent
            service={item}
            onPress={goToRouteWithParameter(Routes.ServiceDetail, item.id, props.history)}
            currentPath={props.location.pathname}
            history={props.history}
            isBookmarked={R.contains(item.id, props.bookmarkedServicesIds)}
            bookmarkService={props.bookmarkService}
            unbookmarkService={props.unbookmarkService}
        />
    );
};

interface ServiceListHeaderComponentProps {
    readonly title: string;
}

export const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => {
    const icon = (
        <View style={{
            flexDirection: 'row',
        }}>
            <Icon
                type={'FontAwesome'} name={'map-marker'}
                style={{
                    color: colors.white,
                    padding: 5,
                    fontSize: values.smallIconSize,
                }}
            />
        </View>
    );
    const heading = (
        <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.white }]}>
            <Trans>FIND A SERVICE NEAR YOU</Trans>
        </Text>
    );
    const title = (
        <Text style={textStyles.headlineH2StyleWhiteLeft}>
            {props.title}
        </Text>);
    return (
        <View style={{
            backgroundColor: colors.teal,
            marginHorizontal: -10,
            marginTop: -10,
            padding: 20,
        }}
        >
            {icon}
            {heading}
            {title}
        </View >
    );
};

const renderRefreshControl = (refreshing: boolean): JSX.Element => (
    <RefreshControl refreshing={refreshing} style={{backgroundColor: colors.teal}} tintColor={colors.white} />
);
