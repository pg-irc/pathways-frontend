// tslint:disable:no-expression-statement
import React, { useEffect } from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import * as Sentry from 'sentry-expo';
import { HumanServiceData, Id } from '../../validation/services/types';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/types';
import { ServiceListItemComponent } from './service_list_item_component';
import { BuildServicesRequestAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { textStyles, colors } from '../../application/styles';
import { isSelectorErrorServicesForTopic } from '../../selectors/services/is_selector_error_services_for_topic';
import * as constants from '../../application/constants';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { UserLocation } from '../../validation/latlong/types';
import { getSentryMessageForError } from '../../validation/errors/sentry_messages';
import { Routes, RouterProps, goToRouteWithParameter } from '../../application/routing';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { EmptyServiceListComponent } from './empty_service_list_component';
import { emptyTopicServicesList } from '../../application/images';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { SetManualUserLocationAction } from '../../stores/manual_user_location';
import { ServiceListLocationSearchComponent } from './service_list_location_search_component';
import { SearchListSeparator } from '../search/separators';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation: UserLocation;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly showPartialLocalizationMessage: boolean;
}

export interface ServiceListActions {
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation) => BuildServicesRequestAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater & RouterProps;

export const ServiceListComponent = (props: Props): JSX.Element => {
    useEffect(refreshServices(props), [props.manualUserLocation]);

    if (isSelectorErrorServicesForTopic(props.topicServicesOrError)) {
        return renderErrorComponent(props, refreshServices(props));
    }

    if (isLoadingServices(props.topicServicesOrError) || isInitialEmptyTopicServices(props.topicServicesOrError)) {
        return renderLoadingComponent(props);
    }

    if (isValidEmptyTopicServices(props.topicServicesOrError)) {
        return renderEmptyComponent(props, refreshServices(props));
    }

    return (
        <ServiceListWrapper {...props}>
            <FlatList
                style={{ backgroundColor: colors.white }}
                data={getServicesIfValid(props.topicServicesOrError)}
                keyExtractor={(service: HumanServiceData): string => service.id}
                renderItem={renderServiceListItem(props)}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={
                    <MessageComponent
                        isVisible={props.showPartialLocalizationMessage}
                        hidePartialLocalizationMessage={props.hidePartialLocalizationMessage}
                    />
                }
            />
        </ServiceListWrapper>
    );
};

const refreshServices = (props: Props): () => void => (
    (): void => {
        props.dispatchServicesRequest();
    }
);

type ServiceListWrapperProps = Props & { readonly children: JSX.Element };

const ServiceListWrapper = (props: ServiceListWrapperProps): JSX.Element => (
    <View style={{ flex: 1 }}>
        {renderHeader(props)}
        {props.children}
    </View>
);

const renderErrorComponent = (props: Props, refreshScreen: () => void): JSX.Element => {
    const errorType = determineErrorType(props.topicServicesOrError);
    const sentryMessage = getSentryMessageForError(errorType, constants.SENTRY_SERVICES_LISTING_ERROR_CONTEXT);
    Sentry.captureMessage(sentryMessage);
    return (
        <ServiceListWrapper {...props}>
            <ErrorScreenSwitcherComponent
                refreshScreen={refreshScreen}
                errorType={errorType}
            />
        </ServiceListWrapper>
    );
};

const renderLoadingComponent = (props: Props): JSX.Element => (
    <ServiceListWrapper {...props}>
        <LoadingServiceListComponent />
    </ServiceListWrapper>
);

const renderEmptyComponent = (props: Props, refreshScreen: () => void): JSX.Element => (
    <ServiceListWrapper {...props}>
        <EmptyServiceListComponent
            title={<Trans>No services to show</Trans>}
            imageSource={emptyTopicServicesList}
            refreshScreen={refreshScreen}
        />
    </ServiceListWrapper>
);

const renderHeader = (props: Props): JSX.Element => (
    <ServiceListHeaderComponent
        title={props.topic.title}
        manualUserLocation={props.manualUserLocation}
        setManualUserLocation={props.setManualUserLocation}
    />
);

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
        />
    );
};

interface ServiceListHeaderComponentProps {
    readonly title: string;
    readonly manualUserLocation: UserLocation;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
}

export const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => (
    <View
        style={{
            backgroundColor: colors.teal,
            paddingTop: 10,
            paddingHorizontal: 10,
            paddingBottom: 4,
        }}
    >
        <Text style={[textStyles.headlineH2StyleWhiteLeft, { paddingHorizontal: 10}]}>
            {props.title}
        </Text>
        <ServiceListLocationSearchComponent
            manualUserLocation={props.manualUserLocation}
            setManualUserLocation={props.setManualUserLocation}
        />
    </View>
);
