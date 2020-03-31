import React from 'react';
import * as R from 'ramda';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { ServiceItemInfo } from '../services/service_list_component';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithParameter, Routes } from '../../application/routing';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions & RouterProps;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => (
    <FlatList
        style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
        data={props.bookmarkedServices}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={renderServiceItems(props)}
        ListEmptyComponent={
            <EmptyBookmarksComponent
                title={<Trans>No services to show</Trans>}
            />
            }
        ListHeaderComponent={<View />}
    />
);

export const renderServiceItems = R.curry((props: Props, itemInfo: ServiceItemInfo): JSX.Element => {
    const service = itemInfo.item;
    const onBookmark = (): BookmarkServiceAction => props.bookmarkService(service);
    const onUnbookmark = (): UnbookmarkServiceAction => props.unbookmarkService(service);
    return (
        <ServiceListItemComponent
            history={props.history}
            service={service}
            onPress={goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)}
            currentPath={props.location.pathname}
            isBookmarked={service.bookmarked}
            onBookmark={onBookmark}
            onUnbookmark={onUnbookmark}
        />
    );
});