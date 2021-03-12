import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { OpenHeaderMenuAction, SaveBookmarkedTopicsScrollOffsetAction } from '../../stores/user_experience/actions';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { OpenServiceAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { History } from 'history';
import { BookmarksTab } from '../../stores/user_experience';
import { SaveBookmarksTabAction } from '../../stores/user_experience/actions';
import { BookmarkTopicAction, Id, UnbookmarkTopicAction } from '../../stores/topics';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly bookmarksTab: BookmarksTab;
    readonly isSendingReview: boolean;
}

export interface BookmarkActions {
    readonly bookmarkTopic: (topicId: Id) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: Id) => UnbookmarkTopicAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly setBookmarksTab: (index: number) => SaveBookmarksTabAction;
    readonly saveTopicsScrollOffset: (offset: number) => SaveBookmarkedTopicsScrollOffsetAction;
}

interface OwnProps {
    readonly history: History;
}

type Props = BookmarksProps & BookmarkActions & OwnProps;

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
                    history={props.history}
                    bookmarkTopic={props.bookmarkTopic}
                    unbookmarkTopic={props.unbookmarkTopic}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openServiceDetail={props.openServiceDetail}
                    openHeaderMenu={props.openHeaderMenu}
                    setBookmarksTab={props.setBookmarksTab}
                    saveTopicsScrollOffset={props.saveTopicsScrollOffset}
                    isSendingReview={props.isSendingReview}
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
