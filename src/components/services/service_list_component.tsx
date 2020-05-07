// tslint:disable:no-expression-statement
import React, { useEffect } from 'react';
import * as Sentry from 'sentry-expo';
import * as constants from '../../application/constants';
import { FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { HumanServiceData, Id } from '../../validation/services/types';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/types';
import { BuildServicesRequestAction, BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { textStyles, colors } from '../../application/styles';
import { isSelectorErrorServicesForTopic } from '../../selectors/services/is_selector_error_services_for_topic';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { UserLocation } from '../../validation/latlong/types';
import { getSentryMessageForError } from '../../validation/errors/sentry_messages';
import { RouterProps } from '../../application/routing';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { EmptyServiceListComponent } from './empty_service_list_component';
import { emptyTopicServicesList } from '../../application/images';
import { MessageComponent } from '../partial_localization/message_component';
import { HidePartialLocalizationMessageAction } from '../../stores/user_profile';
import { SetManualUserLocationAction } from '../../stores/manual_user_location';
import { ServiceListLocationSearchComponent } from './service_list_location_search_component';
import { SearchListSeparator } from '../search/separators';
import { MenuAndBackButtonHeaderComponent } from '../menu_and_back_button_header/menu_and_back_button_header_component';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { History } from 'history';
import { renderServiceItems } from './render_service_items';
import { openURL } from '../link/link';
import { hasNoResultsFromLocationQuery } from '../search/search_results_component';

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
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly hidePartialLocalizationMessage: () => HidePartialLocalizationMessageAction;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater & RouterProps;

export const ServiceListComponent = (props: Props): JSX.Element => {
    useEffect(refreshServices(props), [props.manualUserLocation]);

    if (isTopicServicesError(props.topicServicesOrError, props.manualUserLocation)) {
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
                style={{ backgroundColor: colors.lightGrey }}
                data={getServicesIfValid(props.topicServicesOrError)}
                keyExtractor={(service: HumanServiceData): string => service.id}
                renderItem={renderServiceItems(props)}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={<ListHeaderComponent {...props} />}
            />
        </ServiceListWrapper>
    );
};

const ListHeaderComponent = (props: Props): JSX.Element => {
    const messageText = (
        <>
            <Trans>
                Information about services is currently only available in English. For support in other languages, please
                </Trans> <Text onPress={(): void => openURL('tel: 211')} style={textStyles.messageLink}>
                <Trans>call BC211.</Trans>
            </Text>
        </>
    );
    const linkText = <Trans>Don't show again</Trans>;
    const onLinkPress = (): void => { props.hidePartialLocalizationMessage(); };
    return (
        <MessageComponent
            isVisible={props.showPartialLocalizationMessage}
            messageText={messageText}
            linkText={linkText}
            onLinkPress={onLinkPress}
        />
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

const isTopicServicesError = (topicServicesOrError: SelectorTopicServices, userLocation: UserLocation): boolean => (
    isSelectorErrorServicesForTopic(topicServicesOrError) || hasNoResultsFromLocationQuery(userLocation.latLong)
);

const renderErrorComponent = (props: Props, refreshScreen: () => void): JSX.Element => {
    const errorType = determineErrorType(props.topicServicesOrError, props.manualUserLocation);
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
        topicTitle={props.topic.title}
        manualUserLocation={props.manualUserLocation}
        setManualUserLocation={props.setManualUserLocation}
        history={props.history}
        openHeaderMenu={props.openHeaderMenu}
    />
);

const determineErrorType = (topicServicesOrError: SelectorTopicServices, userLocation: UserLocation): Errors => {
    if (isSelectorErrorServicesForTopic(topicServicesOrError)) {
        return topicServicesOrError.errorMessageType;
    }
    if (hasNoResultsFromLocationQuery(userLocation.latLong)) {
        return Errors.InvalidSearchLocation;
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

interface ServiceListHeaderComponentProps {
    readonly topicTitle: string;
    readonly manualUserLocation: UserLocation;
    readonly history: History;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

export const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => (
    <View>
        <MenuAndBackButtonHeaderComponent
            {...props}
            {...{ textColor: colors.white, backgroundColor: colors.teal }}
        />
        <View
            style={{
                backgroundColor: colors.teal,
                paddingTop: 10,
                paddingHorizontal: 10,
                paddingBottom: 4,
            }}
        >
            <Text style={[textStyles.headlineH2StyleWhiteLeft, { paddingHorizontal: 10, marginBottom: 10 }]}>
                {props.topicTitle}
            </Text>
            <ServiceListLocationSearchComponent
                manualUserLocation={props.manualUserLocation}
                setManualUserLocation={props.setManualUserLocation}
            />
        </View>
    </View>
);
