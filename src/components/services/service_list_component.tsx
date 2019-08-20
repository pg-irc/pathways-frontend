// tslint:disable:no-expression-statement
import React, { useEffect } from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { BuildTopicServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { isError } from '../../selectors/services/is_error';
import * as constants from '../../application/constants';
import { LatLong } from '../../stores/manual_user_location';
import { useRefreshScreen, UseRefreshScreen } from '../../hooks/useRefreshScreen';
import { useDeviceOnlineStatus, OnlineStatus } from '../../hooks/useDeviceOnlineStatus';
import { ErrorScreenSwitcherComponent } from '../error_screens/ErrorScreenSwitcherComponent';
import { Errors } from '../../errors/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation?: LatLong;
    readonly currentPath: string;
}

export interface ServiceListActions {
    readonly dispatchServicesRequestAction: (topic: Topic, manualUserLocation?: LatLong) => BuildTopicServicesRequestAction;
}

export interface ServicesUpdater {
    readonly dispatchServicesRequest: () => BuildTopicServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater;

export const ServiceListComponent = (props: Props): JSX.Element => {
    const onlineStatus = useDeviceOnlineStatus();
    const [lastRefresh, setLastRefreshToNow]: UseRefreshScreen = useRefreshScreen();
    useEffect(() => {
        if (onlineStatus === OnlineStatus.Online) {
            props.dispatchServicesRequest();
        }
    }, [onlineStatus, lastRefresh]);

    if (onlineStatus === OnlineStatus.Offline) {
        return (
            <ErrorScreenSwitcherComponent
                refreshScreen={setLastRefreshToNow}
                errorType={Errors.Offline}
                header={
                    <ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />
                }
            />
        );
    }

    if (isError(props.topicServicesOrError)) {
        return (
            <ErrorScreenSwitcherComponent
                refreshScreen={setLastRefreshToNow}
                errorType={props.topicServicesOrError.errorMessageType}
                header={
                    <ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />
                }
            />
        );
    }

    return (
        <ServicesComponent
            services={getServicesIfValid(props.topicServicesOrError)}
            refreshing={isLoadingServices(props.topicServicesOrError)}
            onRefresh={props.dispatchServicesRequest}
            renderItem={renderServiceListItem(props.currentPath)}
            listEmptyComponent={<EmptyListComponent message={<Trans>No services to show</Trans>} />}
            listHeaderComponent={
                <ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />
            }
        />
    );
};

const isLoadingServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_LOADING
);

const getServicesIfValid = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<Service> => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID ?
        topicServicesOrError.services : []
);

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

type ServiceListListComponentProps = {
    readonly services: ReadonlyArray<Service>;
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
        keyExtractor={(service: Service): string => service.id}
        renderItem={props.renderItem}
        ListEmptyComponent={props.listEmptyComponent}
        ListHeaderComponent={props.listHeaderComponent}
    />
);

const renderServiceListItem = (currentPath: string): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent service={item} currentPath={currentPath} />
    );
};

interface ServiceListHeaderComponentProps {
    readonly englishTitle: string;
}

const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => (
    <View style={{
        backgroundColor: colors.teal,
        marginHorizontal: -10,
        marginTop: -10,
        padding: 20,
    }}
    >
        <Icon
            type={'FontAwesome'}
            name={'map-marker'}
            style={{
                color: colors.white,
                padding: 5,
                fontSize: values.smallIconSize,
            }}
        />
        <Text style={
            [textStyles.headlineH5StyleBlackLeft, textStyles.alwaysLeftAlign, { color: colors.white }]
        }>FIND A SERVICE NEAR YOU</Text>
        <Text style={[textStyles.headlineH2StyleWhiteLeft, textStyles.alwaysLeftAlign]}>
            {props.englishTitle}
        </Text>
    </View >
);
