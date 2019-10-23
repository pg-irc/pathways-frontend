import React from 'react';
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
    const searchResults = getValidSearchResults(props);
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={searchResults}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={SearchListSeparator} />;
};

const getValidSearchResults = (props: Partial<Props & Actions>): ReadonlyArray<SearchServiceData> => {
    const isSearchStringEmpty = props.currentRefinement === '';
    if (isSearchStringEmpty) {
        return [];
    }
    const validationResult = toValidSearchData(props.hits);
    if (!validationResult.isValid) {
        throw new Error(validationResult.errors);
    }
    return validationResult.validData;
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);

const renderSearchHit = ({ item }: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
    const currentPath = '';
    return <ServiceListItemComponent service={toHumanServiceData(item)} currentPath={currentPath} />;
};

const toHumanServiceData = (data: SearchServiceData): HumanServiceData => ({
    id: data.service_id,
    latitude: data._geoloc.lat,
    longitude: data._geoloc.lng,
    name: data.service_name,
    description: data.service_description,
    phoneNumbers: [{
        type: 'temp',
        phoneNumber: '1-800-FOR-NOWW',
    }],
    addresses: [{
        id: 1,
        type: 'physical_address',
        address: data.address.address,
        city: data.address.city,
        stateProvince: data.address.state_province,
        postalCode: data.address.postal_code,
        country: data.address.country,
    }],
    website: data.organization.website,
    email: data.organization.email,
    organizationName: data.organization.name,
});
