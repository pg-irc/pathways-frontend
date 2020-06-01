import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { ListActions } from './bookmarks_connected_component';
import { OpenServiceAction } from '../../stores/services/actions';
import { History } from 'history';
import { BookmarksTabStore, SetBookmarksTabAction } from '../../stores/bookmarks_tab';
import { SaveListOffsetAction } from '../../stores/list_offset';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly bookmarksTab: BookmarksTabStore;
    readonly listOffset: number;
}

export interface BookmarkActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly setBookmarksTab: (index: number) => SetBookmarksTabAction;
    readonly saveListOffset: (offset: number) => SaveListOffsetAction;
}

interface OwnProps {
    readonly history: History;
}

type Props = BookmarksProps & ListActions & OwnProps;

export const BookmarksComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <HelpAndMenuButtonHeaderComponent
            openHeaderMenu={props.openHeaderMenu}
            history={props.history}
        />
        <TitleComponent />
        <I18n>
            {({i18n}: { readonly i18n: I18n }): JSX.Element => (
                <TabSwitcher
                    bookmarksTab={props.bookmarksTab}
                    i18n={i18n}
                    bookmarkedTopics={props.bookmarkedTopics}
                    bookmarkedServices={props.bookmarkedServices}
                    listOffset={props.listOffset}
                    history={props.history}
                    bookmarkTopic={props.bookmarkTopic}
                    unbookmarkTopic={props.unbookmarkTopic}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openServiceDetail={props.openServiceDetail}
                    openHeaderMenu={props.openHeaderMenu}
                    setBookmarksTab={props.setBookmarksTab}
                    saveListOffset={props.saveListOffset}
                />
            )}
        </I18n>
    </View>
);

const TitleComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics and services to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);