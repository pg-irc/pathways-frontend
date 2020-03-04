import React from 'react';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { ServiceItemInfo } from '../services/service_list_component';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithParameter, Routes } from '../../application/routing';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { emptyTopicServicesList } from '../../application/images';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
}

type Props = ServiceBookmarksProps & RouterProps;

export const ServiceBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <FlatList
        style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
        data={props.bookmarkedServices}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={renderServiceItems(props)}
        ListEmptyComponent={
            <EmptyBookmarksComponent
                title={<Trans>No services to show</Trans>}
                // TO DO replace this image once we receive mocks
                imageSource={emptyTopicServicesList}
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
        />
    );
};