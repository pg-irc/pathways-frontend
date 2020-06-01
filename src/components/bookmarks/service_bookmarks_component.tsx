// tslint:disable: no-expression-statement
import React, { useRef, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';
import { History } from 'history';
import { SaveListOffsetAction } from '../../stores/list_offset';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly listOffset: number;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly saveListOffset: (offset: number) => SaveListOffsetAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => {
    const [scrollOffset, setScrollOffset]: readonly [number, (n: number) => void] = useState(props.listOffset);
    const flatListRef = useRef<FlatList<HumanServiceData>>();
    const serviceItemsProps = { ...props, scrollOffset };

    useEffect((): void => {
        if (props.bookmarkedServices.length > 0) {
            flatListRef.current.scrollToOffset({ animated: false, offset: props.listOffset });
        }
    }, [props.listOffset]);

    // tslint:disable-next-line: no-any
    const onScrollEnd = (e: any) => {
        setScrollOffset(e.nativeEvent.contentOffset.y);
    };

    return (
        <FlatList
            ref={flatListRef}
            onScrollEndDrag={onScrollEnd}
            style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
            data={props.bookmarkedServices}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceItems(serviceItemsProps)}
            ListEmptyComponent={
                <EmptyBookmarksComponent
                    title={<Trans>No services to show</Trans>}
                />
            }
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={<View />}
        />
    );
}