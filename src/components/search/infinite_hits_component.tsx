import React from 'react';
import * as R from 'ramda';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { validateServiceSearchResponse } from '../../validation/search';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { ServiceList, Id } from '../../validation/services/types';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';

export interface InfiniteHitsProps {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
    readonly refine: (searchTerms?: string) => string;
    readonly savedServices: ServiceList;
}

export interface InfiniteHitsActions {
    readonly addServiceToSavedListAction: (serviceId: Id) => AddServiceToSavedListAction;
    readonly removeServiceFromSavedListAction: (serviceId: Id) => RemoveServiceFromSavedListAction;
}

type Props = InfiniteHitsProps&InfiniteHitsActions;

export const InfiniteHitsComponent = (props: Partial<Props>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const searchResults = getValidSearchResults(props);
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={searchResults}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit(props)}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={SearchListSeparator} />;
};

const getValidSearchResults = (props: Partial<Props>): ReadonlyArray<SearchServiceData> => {
    const validationResult = validateServiceSearchResponse(props.hits);
    if (!validationResult.isValid) {
        throw new Error(validationResult.errors);
    }
    return validationResult.validData;
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);

const renderSearchHit = R.curry((props: Partial<Props>, itemInfo: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
    const item: SearchServiceData = itemInfo.item;
    return <ServiceListItemComponent
            service={toHumanServiceData(item)}
            currentPath={props.currentPath}
            isBookmarked={R.contains(item.service_id, props.savedServices)}
            addServiceToSavedList={props.addServiceToSavedListAction}
            removeServiceFromSavedList={props.removeServiceFromSavedListAction}
            />;
});
