import React from 'react';
import { View } from 'native-base';
import * as R from 'ramda';
import { History } from 'history';
import { ListRenderItemInfo, FlatList } from "react-native";
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { colors } from '../../application/styles';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from "../../stores/analytics";
import { BookmarkServiceAction, OpenServiceAction, UnbookmarkServiceAction } from "../../stores/services/actions";
import { SaveOrganizationServicesScrollOffsetAction } from "../../stores/user_experience/actions";
import { toHumanServiceData } from "../../validation/search/to_human_service_data";
import { SearchServiceData } from "../../validation/search/types";
import { HumanServiceData, Id } from "../../validation/services/types";
import { SearchListSeparator } from '../search/separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';

interface ServicesTabProps {
    readonly services: ReadonlyArray<SearchServiceData>;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly history: History;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly organizationServicesOffset: number;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

export const OrganizationServiceListComponent = (props: ServicesTabProps): JSX.Element => {

    const renderSearchHit = R.curry((props: ServicesTabProps, itemInfo: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
        const item: SearchServiceData = itemInfo.item;
        const service: HumanServiceData = toHumanServiceData(item, props.bookmarkedServicesIds);
        const onPress = (): void => {
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
                style={{ backgroundColor: colors.lightGrey, flex: 1  }}
                data={props.services}
                keyExtractor={keyExtractor}
                renderItem={renderSearchHit({
                    ...props
                })}
                ItemSeparatorComponent={SearchListSeparator}
            />
        </View>
    );
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);