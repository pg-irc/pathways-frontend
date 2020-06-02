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
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly scrollOffset: number;
    // TO DO REMOVE optional offset
    readonly saveListOffset: (offset?: number) => void;
}

export type ServiceItemInfo = ListRenderItemInfo<HumanServiceData>;

export const renderServiceItems = R.curry((props: ServiceItemsProps, itemInfo: ServiceItemInfo): JSX.Element => {
    const service = itemInfo.item;
    const onBookmark = (): BookmarkServiceAction => props.bookmarkService(service);
    const onUnbookmark = (): UnbookmarkServiceAction => props.unbookmarkService(service);
    const onOpenService = (): void => {
        props.saveListOffset();
        props.openServiceDetail(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
    };
    return (
        <ServiceListItemComponent
            history={props.history}
            service={service}
            onPress={onOpenService}
            isBookmarked={service.bookmarked}
            onBookmark={onBookmark}
            onUnbookmark={onUnbookmark}
        />
    );
});