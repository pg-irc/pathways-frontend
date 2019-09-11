// tslint:disable:no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services/types';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { BuildTopicServicesRequestAction } from '../../stores/services/actions';
import { textStyles, colors, values } from '../../application/styles';
import { isError } from '../../selectors/services/is_error';
import * as constants from '../../application/constants';
import { LatLong } from '../../stores/manual_user_location';
import { useRequestDataIfOnlineReturnRefreshDataCallback }
    from '../../hooks/use_request_data_if_online_return_refresh_data_callback';
import { OnlineStatus, useOnlineStatus } from '../../hooks/use_online_status';
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
    const onlineStatus = useOnlineStatus();
    const refreshServicesData = useRequestDataIfOnlineReturnRefreshDataCallback(props.dispatchServicesRequest);

    if (onlineStatus === OnlineStatus.Offline) {
        return (
            <ErrorScreenSwitcherComponent
                refreshScreen={refreshServicesData}
                errorType={Errors.Offline}
                header={
                    <ServiceListHeaderComponent title={props.topic.title} />
                }
            />
        );
    }

    if (isError(props.topicServicesOrError)) {
        return (
            <ErrorScreenSwitcherComponent
                refreshScreen={refreshServicesData}
                errorType={props.topicServicesOrError.errorMessageType}
                header={
                    <ServiceListHeaderComponent title={props.topic.title} />
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
                <ServiceListHeaderComponent title={props.topic.title} />
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
    readonly title: string;
}

const ServiceListHeaderComponent = (props: ServiceListHeaderComponentProps): JSX.Element => (
    <View style={{
        backgroundColor: colors.teal,
        marginHorizontal: -10,
        marginTop: -10,
        padding: 20,
    }}
    >
        <View style={{ flexDirection: 'row' }}>
            <Icon
                type={'FontAwesome'}
                name={'map-marker'}
                style={{
                    color: colors.white,
                    padding: 5,
                    fontSize: values.smallIconSize,
                }}
            />
        </View>
        <Text style={
            [textStyles.headlineH5StyleBlackLeft, { color: colors.white }]
        }><Trans>FIND A SERVICE NEAR YOU</Trans></Text>
        <Text style={textStyles.headlineH2StyleWhiteLeft}>
            {props.title}
        </Text>
    </View >
);
