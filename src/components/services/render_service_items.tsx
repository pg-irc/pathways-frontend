// tslint:disable: no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { ServiceListItemComponent } from './service_list_item_component';
import { ListRenderItemInfo } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { History } from 'history';
import { SaveTopicServicesScrollOffsetAction, SaveBookmarkedServicesScrollOffsetAction, SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
type SaveOffSetAction = SaveTopicServicesScrollOffsetAction | SaveBookmarkedServicesScrollOffsetAction | SaveOrganizationServicesScrollOffsetAction;

export interface ServiceItemsProps {
    readonly history: History;
    readonly scrollOffset: number;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly saveScrollOffset: (offset: number) => SaveOffSetAction;
}

export type ServiceItemInfo = ListRenderItemInfo<HumanServiceData>;

export const renderServiceItems = R.curry((props: ServiceItemsProps, itemInfo: ServiceItemInfo): JSX.Element => {
    const service = itemInfo.item;
    const onBookmark = (): BookmarkServiceAction => {
        props.saveScrollOffset(props.scrollOffset);
        return props.bookmarkService(service);
    };
    const onUnbookmark = (): UnbookmarkServiceAction => {
        props.saveScrollOffset(props.scrollOffset);
        return props.unbookmarkService(service);
    };
    const onOpenService = (): void => {
        props.saveScrollOffset(props.scrollOffset);
        props.openServiceDetail(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history, props.scrollOffset);
    };
    const onPressServiceReview = (): void => {
        props.saveScrollOffset(props.scrollOffset);
        goToRouteWithParameter(Routes.ServiceReview, service.id, props.history, props.scrollOffset);
    };
    return (
        <ServiceListItemComponent
            history={props.history}
            service={service}
            onPress={onOpenService}
            isBookmarked={service.bookmarked}
            onBookmark={onBookmark}
            onUnbookmark={onUnbookmark}
            onPressServiceReview={onPressServiceReview}
        />
    );
});
