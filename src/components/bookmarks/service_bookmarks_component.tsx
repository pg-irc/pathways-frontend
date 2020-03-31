import React from 'react';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { ServiceItemInfo } from '../services/service_list_component';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithParameter, Routes } from '../../application/routing';
import { ServiceListItemComponent, ServiceListItemActions } from '../services/service_list_item_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
}

type Props = ServiceBookmarksProps & RouterProps & ServiceListItemActions;

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

export const renderServiceItems = (props: Props): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent
            history={props.history}
            service={item}
            onPress={goToRouteWithParameter(Routes.ServiceDetail, item.id, props.history)}
            currentPath={props.location.pathname}
            isBookmarked={item.bookmarked}
            bookmarkService={props.bookmarkService}
            unbookmarkService={props.unbookmarkService}
        />
    );
};