import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { validateServiceSearchResponse } from '../../validation/search';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';

export interface Props {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
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
    const validationResult = validateServiceSearchResponse(props.hits);
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
