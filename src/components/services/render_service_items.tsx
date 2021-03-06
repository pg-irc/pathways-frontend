// tslint:disable: no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { ServiceListItemComponent } from './service_list_item_component';
import { ListRenderItemInfo } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { History } from 'history';

export interface ServiceItemsProps {
    readonly history: History;
    readonly scrollOffset: number;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
}

export type ServiceItemInfo = ListRenderItemInfo<HumanServiceData>;

export const renderServiceItems = R.curry((props: ServiceItemsProps, itemInfo: ServiceItemInfo): JSX.Element => {
    const service = itemInfo.item;
    const onOpenService = (): void => {
        props.openServiceDetail(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history, props.scrollOffset);
    };
    const onPressServiceReview = (): void => {
        goToRouteWithParameter(Routes.ServiceReview, service.id, props.history, props.scrollOffset);
    };
    return (
        <ServiceListItemComponent
            history={props.history}
            service={service}
            onPress={onOpenService}
            isBookmarked={service.bookmarked}
            onBookmark={(): BookmarkServiceAction => props.bookmarkService(service)}
            onUnbookmark={(): UnbookmarkServiceAction => props.unbookmarkService(service)}
            onPressServiceReview={onPressServiceReview}
        />
    );
});
