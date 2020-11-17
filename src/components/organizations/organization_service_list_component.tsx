import React from 'react';
import { View } from 'native-base';
import * as R from 'ramda';
import { History } from 'history';
import { ListRenderItemInfo, FlatList } from "react-native";
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { colors } from '../../application/styles';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from "../../stores/analytics";
import { BookmarkServiceAction, OpenServiceAction, SaveServiceAction, UnbookmarkServiceAction } from "../../stores/services/actions";
import { SaveOrganizationServicesScrollOffsetAction } from "../../stores/user_experience/actions";
import { HumanServiceData } from "../../validation/services/types";
import { SearchListSeparator } from '../search/separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';

interface ServicesTabProps {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly organizationServicesOffset: number;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

export const OrganizationServiceListComponent = (props: ServicesTabProps): JSX.Element => {

    const renderServiceHit = R.curry((props: ServicesTabProps, itemInfo: ListRenderItemInfo<HumanServiceData>): JSX.Element => {
        const service: HumanServiceData = itemInfo.item;
        const onPress = (): void => {
            props.saveService(service);
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

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            <FlatList
                style={{ backgroundColor: colors.lightGrey, flex: 1 }}
                data={props.services}
                keyExtractor={keyExtractor}
                renderItem={renderServiceHit({
                    ...props
                })}
                ItemSeparatorComponent={SearchListSeparator}
            />
        </View>
    );
};

const keyExtractor = (item: HumanServiceData): string => (
    item.id
);