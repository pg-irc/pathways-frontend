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
import { Id } from '../../stores/services';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';

export interface InfiniteHitsProps {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
    readonly refine: (searchTerms?: string) => string;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly savedServicesIds: ReadonlyArray<Id>;
}

export interface InfiniteHitsActions {
    readonly addServiceToSavedList: (service: HumanServiceData) => AddServiceToSavedListAction;
    readonly removeServiceFromSavedList: (service: HumanServiceData) => RemoveServiceFromSavedListAction;
}

type Props = InfiniteHitsProps & InfiniteHitsActions;

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
    const service: HumanServiceData = toHumanServiceData(item, props.savedServicesIds);
    const onPress = (): void => {
                props.saveService(service);
                goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
            };
    return <ServiceListItemComponent
        service={service}
        currentPath={props.currentPath}
        onPress={onPress}
        isBookmarked={R.contains(item.service_id, props.savedServicesIds)}
        addServiceToSavedList={props.addServiceToSavedList}
        removeServiceFromSavedList={props.removeServiceFromSavedList}
        />;
});