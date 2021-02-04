// tslint:disable: no-expression-statement
import * as R from 'ramda';
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';
import { History } from 'history';
import { SaveBookmarkedServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { setServicesOffsetThrottled } from '../set_services_offset_throttled';
import { ServiceBanner } from './service_banner';
import { EmptyComponent } from '../empty_component/empty_component';
import { scrollToOffset } from '../scroll_to_offset_with_timeout';
import { ThankYouMessageComponent } from '../services/thank_you_message_component';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly scrollOffset: number;
    readonly i18n: I18n;
    readonly isSendingReview: boolean;
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
           scrollToOffset(flatListRef, props.scrollOffset);
        }
    }, [props.scrollOffset, props.bookmarkedServices, flatListRef]);

    return (
        <>
            <ServiceBanner isVisible={!R.isEmpty(props.bookmarkedServices)}/>
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
                ListHeaderComponent={<EmptyComponent/>}
                initialNumToRender={props.saveScrollOffset ? props.bookmarkedServices.length : 20}
            />
            <ThankYouMessageComponent i18n={props.i18n} isVisible={props.isSendingReview}/>
        </>
    );
};
