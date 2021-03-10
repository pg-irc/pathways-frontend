// tslint:disable: no-expression-statement
import * as R from 'ramda';
import React, { useRef } from 'react';
import { FlatList, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';
import { History } from 'history';
import { setServicesOffsetThrottled } from '../set_services_offset_throttled';
import { ServiceBanner } from './service_banner';
import { ThankYouMessageComponent } from '../services/thank_you_message_component';
import { useServicesScrollToOffset } from '../use_services_scroll_to_offset';
import { OffsetHook, useOffset } from '../use_offset';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly i18n: I18n;
    readonly isSendingReview: boolean;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => {
    const flatListRef = useRef<FlatList<HumanServiceData>>();
    const { offset, setOffset, offsetFromRouteLocation }: OffsetHook = useOffset();
    useServicesScrollToOffset(flatListRef, offsetFromRouteLocation, props.bookmarkedServices);
    return (
        <>
            <FlatList
                ref={flatListRef}
                onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setServicesOffsetThrottled(e, setOffset)}
                style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
                data={props.bookmarkedServices}
                keyExtractor={(service: HumanServiceData): string => service.id}
                renderItem={renderServiceItems({
                    ...props,
                    scrollOffset: offset,
                })}
                ListEmptyComponent={
                    <EmptyBookmarksComponent
                        title={<Trans>No services to show</Trans>}
                    />
                }
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={<ServiceBanner isVisible={!R.isEmpty(props.bookmarkedServices)} />}
                initialNumToRender={offsetFromRouteLocation ? props.bookmarkedServices.length : 20}
            />
            <ThankYouMessageComponent i18n={props.i18n} isVisible={props.isSendingReview} />
        </>
    );
};
