import React from 'react';
import * as R from 'ramda';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { UnvalidatedData, SearchServiceData } from '../../validation/search/types';
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
    const searchResulsts = getValidSearchResults(props);
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={searchResulsts}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={SearchListSeparator} />;
};

const getValidSearchResults = (props: Partial<Props & Actions>): ReadonlyArray<SearchServiceData> => {
    const isSearchStringEmpty = props.currentRefinement === '';
    const hits = isSearchStringEmpty ? [] : props.hits;
    return R.map(toValidSearchData, hits);
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);

const renderSearchHit = ({ item }: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
    const currentPath = '';
    return <ServiceListItemComponent service={toHumanServiceData(item)} currentPath={currentPath} />;
};

const toHumanServiceData = (hit: SearchServiceData): HumanServiceData => ({
    id: hit.service_id,
    latitude: hit.latitude,
    longitude: hit.longitude,
    name: hit.service_name,
    description: hit.service_description,
    phoneNumbers: [{
        type: 'temp',
        phoneNumber: '1-800-FOR-NOWW',
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
    website: hit.organization_website,
    email: hit.organization_email,
    organizationName: hit.organization_name,
});
