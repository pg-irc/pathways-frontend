import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { UnvalidatedData, SearchData, SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { HumanServiceData } from '../../validation/services/types';
import { toValidSearchData } from '../../validation/search';

export interface Props {
    readonly currentPath: string;
    readonly hits: ReadonlyArray<UnvalidatedData>;
    readonly hasMore: boolean;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (searchTerms?: string) => string;
}

export const InfiniteHitsComponent = (props: Partial<Props & Actions>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const hits = props.currentRefinement === '' ? [] : props.hits;
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={hits}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={SearchListSeparator} />;
};

const keyExtractor = (item: UnvalidatedData): string => (
    item.objectID || 'missingId'
);

const renderSearchHit = ({ item }: ListRenderItemInfo<UnvalidatedData>): JSX.Element => {
    const currentPath = '';
    return <ServiceListItemComponent service={toValidService(item)} currentPath={currentPath} />;
};

const toValidService = (data: UnvalidatedData): HumanServiceData => {
    return toHumanServiceData(throwOnOrganizationHit(toValidSearchData(data)));
};

const throwOnOrganizationHit = (searchHit: SearchData): SearchServiceData => {
    if (searchHit.type === 'OrganizationSearchItem') {
        throw new Error('Invalid search hit type, service expected');
    }
    return searchHit;
};

const toHumanServiceData = (hit: SearchServiceData): HumanServiceData => ({
    id: hit.service_id,
    latitude: hit.latitude,
    longitude: hit.longitude,
    name: hit.service_name,
    description: hit.service_description,
    phoneNumbers: [{
        type: 'toll free',
        phoneNumber: '1-800-123-4567',
    }],
    addresses: [{
        id: 1,
        type: 'physical_address',
        address: hit.street_address,
        city: hit.city,
        stateProvince: hit.province,
        postalCode: hit.postal_code,
        country: hit.country,
    }],
    website: hit.type,
    email: hit.type,
    organizationName: hit.type,
});
