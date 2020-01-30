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
import { isSelectorErrorServicesForTopic } from '../../selectors/services/is_selector_error_services_for_topic';
import * as constants from '../../application/constants';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { LatLong } from '../../validation/latlong/types';
import { getSentryMessageForError } from '../../validation/errors/sentry_messages';
import { Routes, RouterProps, goToRouteWithParameter } from '../../application/routing';
import * as R from 'ramda';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { EmptyServiceListComponent } from './empty_service_list_component';
import { emptyTopicServicesList } from '../../application/images';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation?: LatLong;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly showPartialLocalizationMessage: boolean;
}

export interface ServiceListActions {
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation?: LatLong) => BuildServicesRequestAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater & RouterProps;

type Timestamp = number;
type TimestampSetter = Dispatch<SetStateAction<Timestamp>>;

export const ServiceListComponent = (props: Props): JSX.Element => {
    const [lastScreenRefresh, setLastScreenRefresh]: readonly [Timestamp, TimestampSetter] = useState(Date.now());
    useEffect(() => refreshServices(props), [lastScreenRefresh]);

    if (isSelectorErrorServicesForTopic(props.topicServicesOrError)) {
        return (
            <ErrorComponent
                errorType={determineErrorType(props.topicServicesOrError)}
                refreshScreen={(): void => setLastScreenRefresh(Date.now())}
                title={props.topic.title}
            />
        );
    }

    if (isLoadingServices(props.topicServicesOrError) || isInitialEmptyTopicServices(props.topicServicesOrError)) {
        return (
            <LoadingServiceListComponent
                header={
                    <View style={{ marginBottom: -8}}>
                        <ServiceListHeaderComponent title={props.topic.title} />
                        <MessageComponent
                            showPartialLocalizationMessage={props.showPartialLocalizationMessage}
                            hidePartialLocalizationMessage={props.hidePartialLocalizationMessage}
                        />
                    </View>
                }
            />
        );
    }

    if (isValidEmptyTopicServices(props.topicServicesOrError)) {
        return (
                <EmptyServiceListComponent
                    title={<Trans>No services to show</Trans>}
                    imageSource={emptyTopicServicesList}
                    refreshScreen={(): void => setLastScreenRefresh(Date.now())}
                    header={
                        <ServiceListHeaderComponent title={props.topic.title} />
                    }
                />
        );
    }

    return (
        <FlatList
            style={{ backgroundColor: colors.lightGrey }}
            refreshing={isLoadingServices(props.topicServicesOrError)}
            onRefresh={(): void => refreshServices(props)}
            refreshControl={renderRefreshControl(isLoadingServices(props.topicServicesOrError))}
            data={getServicesIfValid(props.topicServicesOrError)}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceListItem(props)}
            ListHeaderComponent={
            <View style={{ marginBottom: -8}}>
                <ServiceListHeaderComponent title={props.topic.title} />
                <MessageComponent
                    showPartialLocalizationMessage={props.showPartialLocalizationMessage}
                    hidePartialLocalizationMessage={props.hidePartialLocalizationMessage}
                />
            </View>
            }
        />
    );
};

const refreshServices = (props: Props): void => {
    if (servicesFetchRequired(props.topicServicesOrError)) {
        props.dispatchServicesRequest();
    }
};

const servicesFetchRequired = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.ERROR_SERVICES_FOR_TOPIC ||
    topicServicesOrError.type === constants.VALID_SERVICES_FOR_TOPIC && topicServicesOrError.isExpired ||
    topicServicesOrError.type === constants.INITIAL_EMPTY_SERVICES_FOR_TOPIC
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
    if (isSelectorErrorServicesForTopic(topicServicesOrError)) {
        return topicServicesOrError.errorMessageType;
    }
    return Errors.Exception;
};

const getServicesIfValid = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<HumanServiceData> => (
    topicServicesOrError.type === constants.VALID_SERVICES_FOR_TOPIC && topicServicesOrError.services
);

const isLoadingServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.LOADING_SERVICES_FOR_TOPIC
);

const isValidEmptyTopicServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.VALID_SERVICES_FOR_TOPIC && topicServicesOrError.services.length <= 0
);

const isInitialEmptyTopicServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.INITIAL_EMPTY_SERVICES_FOR_TOPIC
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
