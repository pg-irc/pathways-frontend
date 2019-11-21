// tslint:disable:no-expression-statement
import React from 'react';
import { History } from 'history';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import * as Sentry from 'sentry-expo';
import { HumanServiceData } from '../../validation/services/types';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { BuildServicesRequestAction } from '../../stores/services/actions';
import { textStyles, colors, values } from '../../application/styles';
import { isError } from '../../selectors/services/is_error';
import * as constants from '../../application/constants';
import { useRequestDataIfOnlineReturnRefreshDataCallback }
    from '../../hooks/use_request_data_if_online_return_refresh_data_callback';
import { OnlineStatus, useOnlineStatus } from '../../hooks/use_online_status';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../validation/errors/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { LatLong } from '../../validation/latlong/types';
import { getSentryMessageForError } from '../../validation/errors/sentry_messages';
import { RouterProps } from '../../application/routing';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation?: LatLong;
}

export interface ServiceListActions {
    readonly dispatchServicesRequestAction: (topic: Topic, manualUserLocation?: LatLong) => BuildServicesRequestAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater & RouterProps;

export const ServiceListComponent = (props: Props): JSX.Element => {
    const onlineStatus = useOnlineStatus();
    const refreshServicesData = useRequestDataIfOnlineReturnRefreshDataCallback(onlineStatus, props.dispatchServicesRequest);
    const hasNoErrors = onlineStatus !== OnlineStatus.Offline && !isError(props.topicServicesOrError);

    if (hasNoErrors) {
        return (
            <ServicesComponent
                services={getServicesIfValid(props.topicServicesOrError)}
                refreshing={isLoadingServices(props.topicServicesOrError)}
                onRefresh={props.dispatchServicesRequest}
                renderItem={renderServiceListItem(props.location.pathname, props.history)}
                listEmptyComponent={<EmptyListComponent message={<Trans>No services to show</Trans>} />}
                listHeaderComponent={
                    <ServiceListHeaderComponent title={props.topic.title} />
                }
            />
        );
    }

    const errorType = determineErrorType(onlineStatus, props.topicServicesOrError);
    const sentryMessage = getSentryMessageForError(errorType, constants.SENTRY_SERVICES_LISTING_ERROR_CONTEXT);
    Sentry.captureMessage(sentryMessage);
    return (
        <ErrorScreenSwitcherComponent
            refreshScreen={refreshServicesData}
            errorType={errorType}
            header={
                <ServiceListHeaderComponent title={props.topic.title} />
            }
        />
    );
};

const determineErrorType = (onlineStatus: OnlineStatus, topicServicesOrError: SelectorTopicServices): Errors => {
    if (onlineStatus === OnlineStatus.Offline) {
        return Errors.Offline;
    }
    if (isError(topicServicesOrError)) {
        return topicServicesOrError.errorMessageType;
    }
    return Errors.Exception;
};

const isLoadingServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_LOADING
);

const getServicesIfValid = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<HumanServiceData> => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID ?
        topicServicesOrError.services : []
);

type ServiceItemInfo = ListRenderItemInfo<HumanServiceData>;

type ServiceListListComponentProps = {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly refreshing: boolean;
    readonly onRefresh: () => void;
    readonly renderItem: ({ item }: ServiceItemInfo) => JSX.Element;
    readonly listEmptyComponent: JSX.Element;
    readonly listHeaderComponent: JSX.Element;
};

const ServicesComponent = (props: ServiceListListComponentProps): JSX.Element => (
    <FlatList
        style={{ backgroundColor: colors.lightGrey }}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        data={props.services}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={props.renderItem}
        ListEmptyComponent={props.listEmptyComponent}
        ListHeaderComponent={props.listHeaderComponent}
    />
);

const renderServiceListItem = (currentPath: string, history: History): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent service={item} currentPath={currentPath} history={history}/>
    );
};

interface ServiceListHeaderComponentProps {
    readonly title: string;
}

const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => {
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