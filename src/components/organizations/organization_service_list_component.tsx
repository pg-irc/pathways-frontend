// tslint:disable: no-expression-statement
import React, { useRef } from 'react';
import { View } from 'native-base';
import { History } from 'history';
import { FlatList, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { colors } from '../../application/styles';
import { BookmarkServiceAction, OpenServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { SearchListSeparator } from '../search/separators';
import { renderServiceItems } from '../services/render_service_items';
import { setServicesOffsetThrottled } from '../set_services_offset_throttled';
import { useServicesScrollToOffset } from '../use_services_scroll_to_offset';
import { OffsetHook, useOffset } from '../use_offset';

export interface ServicesTabProps {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly history: History;
}

export interface ServiceTabActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
}

type Props = ServicesTabProps & ServiceTabActions;

export const OrganizationServiceListComponent = (props: Props): JSX.Element => {
    const { offset, setOffset, offsetFromRouteLocation }: OffsetHook = useOffset();
    const flatListRef = useRef<FlatList<HumanServiceData>>();
    useServicesScrollToOffset(flatListRef, offsetFromRouteLocation, props.services);

    return (
        <FlatList
            ref={flatListRef}
            onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setServicesOffsetThrottled(e, setOffset)}
            style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
            data={props.services}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceItems({
                history: props.history,
                scrollOffset: offset,
                bookmarkService: props.bookmarkService,
                unbookmarkService: props.unbookmarkService,
                openServiceDetail: props.openServiceDetail,
            })}
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={<View />}
            initialNumToRender={offsetFromRouteLocation ? props.services.length : 20}
        />
    );
};