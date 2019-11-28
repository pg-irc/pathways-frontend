import React from 'react';
import * as R from 'ramda';
import { FlatList } from 'react-native';
import { ServiceListData, HumanServiceData } from '../../validation/services/types';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListHeaderComponent, ServiceItemInfo } from '../services/service_list_component';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { ServiceListItemActions, ServiceListItemComponent } from '../services/service_list_item_component';
import { getSavedServicesIds } from './get_saved_services_ids';
import { colors } from '../../application/styles';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ServiceListData;
    readonly currentPath: string;
}

type Props = ServiceBookmarksProps & RouterProps & ServiceListItemActions;

export const ServiceBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <FlatList
        style={{ backgroundColor: colors.lightGrey }}
        data={props.bookmarkedServices}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={renderServiceItems(props)}
        ListEmptyComponent={<EmptyListComponent message={<Trans>No services to show</Trans>}/>}
        ListHeaderComponent={<ServiceListHeaderComponent title={'Services'} />}
    />
);

export const renderServiceItems = (props: Props): ({ item }: ServiceItemInfo) => JSX.Element => {
    return ({ item }: ServiceItemInfo): JSX.Element => (
        <ServiceListItemComponent
        service={item}
        currentPath={props.currentPath}
        isBookmarked={R.contains(item.id, getSavedServicesIds(props.bookmarkedServices))}
        addServiceToSavedList={props.addServiceToSavedList}
        removeServiceFromSavedList={props.removeServiceFromSavedList}
        />
    );
};