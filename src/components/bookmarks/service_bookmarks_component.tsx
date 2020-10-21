// tslint:disable: no-expression-statement
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';
import { History } from 'history';
import { SaveBookmarkedServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { setServicesOffsetThrottled } from '../set_services_offset_throttled';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly scrollOffset: number;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly saveScrollOffset: (offset: number) => SaveBookmarkedServicesScrollOffsetAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => {
    const [bookmarkedServicesOffset, setBookmarkedServicesOffset]: readonly [number, (n: number) => void] = useState(props.scrollOffset);
    const flatListRef = useRef<FlatList<HumanServiceData>>();

    useEffect((): void => {
        if (props.bookmarkedServices.length > 0) {
            flatListRef.current.scrollToOffset({ animated: false, offset: props.scrollOffset });
        }
    }, [props.scrollOffset, props.bookmarkedServices, flatListRef]);

    return (
        <FlatList
            ref={flatListRef}
            onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setServicesOffsetThrottled(e, setBookmarkedServicesOffset)}
            style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
            data={props.bookmarkedServices}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceItems({
                ...props,
                scrollOffset: bookmarkedServicesOffset,
                saveScrollOffset: props.saveScrollOffset,
            })}
            ListEmptyComponent={
                <EmptyBookmarksComponent
                    title={<Trans>No services to show</Trans>}
                />
            }
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={<View />}
            initialNumToRender={props.saveScrollOffset ? props.bookmarkedServices.length : 20}
        />
    );
};
