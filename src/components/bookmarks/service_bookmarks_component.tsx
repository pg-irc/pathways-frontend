import React from 'react';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../../validation/services/types';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { colors } from '../../application/styles';
import { View } from 'native-base';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { renderServiceItems } from '../services/render_service_items';
import { SearchListSeparator } from '../search/separators';

export interface ServiceBookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
}

export interface ServiceBookmarksActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = ServiceBookmarksProps & ServiceBookmarksActions & RouterProps;

export const ServiceBookmarksComponent = (props: Props): JSX.Element => (
    <FlatList
        style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
        data={props.bookmarkedServices}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={renderServiceItems(props)}
        ListEmptyComponent={
            <EmptyBookmarksComponent
                title={<Trans>No services to show</Trans>}
            />
            }
        ItemSeparatorComponent={SearchListSeparator}
        ListHeaderComponent={<View />}
    />
);