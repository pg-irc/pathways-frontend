// tslint:disable:no-expression-statement
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import { SelectorTopicServices } from '../../selectors/services/types';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { SendTopicServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { isErrorSelectorTopicServices } from '../../selectors/services/is_error_selector_topic_services';
import * as constants from '../../application/constants';
import { LatLong } from '../../stores/manual_user_location';
import { useDeviceIsOnline } from '../../hooks/useDeviceIsOnline';
import { useRefreshScreen, UseRefreshScreen } from '../../hooks/useRefreshScreen';
import { ErrorScreenPickerComponent } from '../error_screens/ErrorScreenPickerComponent';
import { Errors } from '../../errors/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';

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

type SetIsOffline = Dispatch<SetStateAction<boolean>>;

export const ServiceListComponent = (props: Props): JSX.Element => {
    const [isOnline, setIsOnline]: [boolean, SetIsOffline] = useState(undefined);
    const [lastRefresh, refreshScreen]: UseRefreshScreen = useRefreshScreen();
    const isOffline = isOnline === false;

    const deviceIsOnlineCallback = (deviceIsOnline: boolean): void => setIsOnline(deviceIsOnline);
    const requestTopicServicesEffect = (): void => {
        if (isOnline) {
            props.requestTopicServices();
        }
    };

    useDeviceIsOnline(deviceIsOnlineCallback);
    useEffect(requestTopicServicesEffect, [isOnline, lastRefresh]);

    if (isOffline) {
        return (
            <ErrorScreenPickerComponent
                refreshScreen={refreshScreen}
                errorType={Errors.Offline}
                errorScreenHeader={
                    <ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />
                }
            />
        );
    }

    if (isErrorSelectorTopicServices(props.topicServicesOrError)) {
        return (
            <ErrorScreenPickerComponent
                refreshScreen={refreshScreen}
                errorType={props.topicServicesOrError.errorMessageType}
                errorScreenHeader={
                    <ServiceListHeaderComponent englishTitle={props.topic.englishTitle} />
                }
            />
        );
    }

    return (
        <ServiceListListComponent
            services={getServices(props.topicServicesOrError)}
            refreshing={isLoadingServices(props.topicServicesOrError)}
            onRefresh={props.requestTopicServices}
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

const getServices = (topicServicesOrError: SelectorTopicServices): ReadonlyArray<Service> => (
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
