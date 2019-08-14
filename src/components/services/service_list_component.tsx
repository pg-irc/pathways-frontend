// tslint:disable:no-expression-statement
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { SendTopicServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListErrorComponent } from './service_list_error_component';
import { isErrorSelectorTopicServices } from '../../selectors/services/is_error_selector_topic_services';
import * as constants from '../../application/constants';
import { LatLong } from '../../stores/manual_user_location';
import { useDeviceIsOffline } from '../../hooks/useDeviceIsOffline';
import { DeviceOfflineComponent } from '../error_screens/DeviceOfflineComponent';
import { useRefreshScreen } from '../../hooks/useRefreshScreen';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly topicServicesOrError: SelectorTopicServices;
    readonly manualUserLocation?: LatLong;
    readonly currentPath: string;
}

export interface ServiceListActions {
    readonly requestTopicServicesWithParameters: (topic: Topic, manualUserLocation?: LatLong) => SendTopicServicesRequestAction;
}

export interface ServicesUpdater {
    readonly requestTopicServices: () => SendTopicServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & ServicesUpdater;

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

export const ServiceListComponent = (props: Props): JSX.Element => {
    const [isOffline, setIsOffline]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const refresh = useRefreshScreen();
    useDeviceIsOffline((deviceIsOffline: boolean) => setIsOffline(deviceIsOffline));
    useEffect(() => props.requestTopicServices, []);

    if (isOffline) {
        return <DeviceOfflineComponent refresh={refresh} />;
    }

    if (isErrorSelectorTopicServices(props.topicServicesOrError)) {
        return <ServiceListErrorComponent error={props.topicServicesOrError} />;
    }

    return (
        <ServiceListListComponent
            services={getServices(props.topicServicesOrError)}
            refreshing={isLoadingServices(props.topicServicesOrError)}
            onRefresh={props.requestTopicServices}
            renderItem={renderServiceListItem(props.currentPath)}
            listEmptyComponent={<ServiceListEmptyComponent />}
            listHeaderComponent={<ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />}
        />
    );
};

const isLoadingServices = (topicServicesOrError: SelectorTopicServices): boolean => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_LOADING
);

const getServices = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<Service> => (
    topicServicesOrError.type === constants.TOPIC_SERVICES_VALID ?
        topicServicesOrError.services : []
);

type ServiceListListComponentProps = {
    readonly services: ReadonlyArray<Service>;
    readonly refreshing: boolean;
    readonly onRefresh: () => void;
    readonly renderItem: ({ item }: ServiceItemInfo) => JSX.Element;
    readonly listEmptyComponent: JSX.Element;
    readonly listHeaderComponent: JSX.Element;
};

const ServiceListListComponent = (props: ServiceListListComponentProps): JSX.Element => (
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

const ServiceListEmptyComponent = (): JSX.Element => {
    return <EmptyListComponent message={<Text>No related services found</Text>} />;
};
