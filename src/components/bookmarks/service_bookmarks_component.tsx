// tslint:disable: no-expression-statement
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, NativeSyntheticEvent, ScrollViewProperties } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';
import { History } from 'history';
import { SaveBookmarkedServicesOffsetAction } from '../../stores/user_experience/actions';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly bookmarkedServicesOffset: number;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly saveBookmarkedServicesOffset: (offset: number) => SaveBookmarkedServicesOffsetAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => {
    const [bookmarkedServicesOffset, setBookmarkedServicesOffset]: readonly [number, (n: number) => void] = useState(props.bookmarkedServicesOffset);
    const flatListRef = useRef<FlatList<HumanServiceData>>();

    useEffect((): void => {
        if (props.bookmarkedServices.length > 0) {
            flatListRef.current.scrollToOffset({ animated: false, offset: props.bookmarkedServicesOffset });
        }
    }, [props.bookmarkedServicesOffset, props.bookmarkedServices, flatListRef ]);

    const onScrollEnd = (e: NativeSyntheticEvent<ScrollViewProperties>): void => {
        setBookmarkedServicesOffset(e.nativeEvent.contentOffset.y);
    };

    return (
        <FlatList
            ref={flatListRef}
            onScrollEndDrag={onScrollEnd}
            style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
            data={props.bookmarkedServices}
            keyExtractor={(service: HumanServiceData): string => service.id}
            renderItem={renderServiceItems({
                ...props,
                scrollOffset: bookmarkedServicesOffset,
                saveScrollOffset: props.saveBookmarkedServicesOffset,
            })}
            ListEmptyComponent={
                <EmptyBookmarksComponent
                    title={<Trans>No services to show</Trans>}
                />
            }
            ItemSeparatorComponent={SearchListSeparator}
            ListHeaderComponent={<View />}
            initialNumToRender={props.saveBookmarkedServicesOffset ? props.bookmarkedServices.length : 20}
        />
    );
}