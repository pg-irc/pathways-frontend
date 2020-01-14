// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import * as R from 'ramda';
import { History } from 'history';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values, textStyles } from '../../application/styles';
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
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { CloseButtonComponent } from '../close_button/close_button_component';

export interface InfiniteHitsProps {
    readonly currentPath: string;
    // tslint:disable-next-line:no-any
    readonly hits: ReadonlyArray<any>;
    readonly hasMore: boolean;
    readonly refine: (searchTerms?: string) => string;
    readonly refineNext: () => void;
    readonly history: History;
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface InfiniteHitsActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = InfiniteHitsProps & InfiniteHitsActions;

export const InfiniteHitsComponent = (props: Partial<Props>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const searchResults = getValidSearchResults(props);
    const loadMoreButton = renderLoadMoreButton(props.hasMore, props.refineNext);
    const [modalState, setModalState] = useState(true);
    const modal = renderServiceDetailModal(modalState, setModalState);
    const serviceList = (
        <FlatList
            style={{ backgroundColor: colors.white }}
            refreshing={false}
            data={searchResults}
            keyExtractor={keyExtractor}
            renderItem={renderSearchHit(props)}
            ListEmptyComponent={EmptyComponent}
            ItemSeparatorComponent={SearchListSeparator} />
    );
    return <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey }}>{modal}{serviceList}{loadMoreButton}</View>;
};

const renderServiceDetailModal = (modalState: boolean, setModalState: (state: boolean) => void): JSX.Element => {

    const hideModal = (): void => {
        setModalState(false);
    };
    return (
        <Modal isVisible={modalState}>
            <View padder style={{ backgroundColor: colors.white, borderRadius: 5, flex: 1 }}>
                <CloseButtonComponent
                    onPress={hideModal}
                    color={colors.black}
                />
                <Text>Hi I am the modal</Text>
            </View>
        </Modal>
    );
};

const renderLoadMoreButton = (hasMore: boolean, refineNext: () => void): JSX.Element => {
    if (hasMore) {
        return (
            <Button onPress={refineNext} style={{
                backgroundColor: colors.teal,
                borderRadius: values.roundedBorderRadius,
                alignSelf: 'flex-start',
                paddingVertical: 15,
                paddingHorizontal: 80,
                marginVertical: 15,
                marginHorizontal: 24,
            }} >
                <Text style={textStyles.button} uppercase={false}><Trans>Show more services</Trans></Text>
            </Button>);
    }
    return <EmptyComponent />;
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
    const service: HumanServiceData = toHumanServiceData(item, props.bookmarkedServicesIds);
    const onPress = (): void => {
        props.saveService(service);
        goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
    };
    return <ServiceListItemComponent
        service={service}
        history={props.history}
        currentPath={props.currentPath}
        onPress={onPress}
        isBookmarked={R.contains(item.service_id, props.bookmarkedServicesIds)}
        bookmarkService={props.bookmarkService}
        unbookmarkService={props.unbookmarkService}
    />;
});