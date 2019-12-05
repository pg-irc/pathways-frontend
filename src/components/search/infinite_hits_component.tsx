// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { SearchServiceData } from '../../validation/search/types';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { validateServiceSearchResponse } from '../../validation/search';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction } from '../../stores/services/actions';
import { goToRouteWithParameter, Routes } from '../../application/routing';

export interface Props {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
    readonly refine: (searchTerms?: string) => string;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
}

export const InfiniteHitsComponent = (props: Partial<Props>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const searchResults = getValidSearchResults(props);
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={searchResults}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit(props.currentPath, props.history, props.saveService)}
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

type SearchServiceDataItem = ListRenderItemInfo<SearchServiceData>;

const renderSearchHit = R.curry((
        currentPath: string,
        history: History,
        saveServiceFromSearch: (service: HumanServiceData) => SaveServiceAction,
        itemInfo: SearchServiceDataItem,
    ): JSX.Element => {
    const service: HumanServiceData = toHumanServiceData(itemInfo.item);
    const onPress = (): void => {
        saveServiceFromSearch(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, history)();
    };
    return (
        <ServiceListItemComponent
            service={service}
            currentPath={currentPath}
            onPress={onPress}
        />
    );
});
