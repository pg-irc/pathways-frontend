import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { ListActions } from './bookmarks_connected_component';
import { OpenServiceAction } from '../../stores/services/actions';
import { History } from 'history';
import { BookmarksTab } from '../../stores/user_experience';
import { SetBookmarksTabAction, SaveBookmarkedServicesOffsetAction } from '../../stores/user_experience/actions';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly bookmarksTab: BookmarksTab;
    readonly bookmarkedServicesOffset: number;
}

export interface BookmarkActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly setBookmarksTab: (index: number) => SetBookmarksTabAction;
    readonly saveBookmarkedServicesOffset: (offset: number) => SaveBookmarkedServicesOffsetAction;
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
                    bookmarkedServicesOffset={props.bookmarkedServicesOffset}
                    history={props.history}
                    bookmarkTopic={props.bookmarkTopic}
                    unbookmarkTopic={props.unbookmarkTopic}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openServiceDetail={props.openServiceDetail}
                    openHeaderMenu={props.openHeaderMenu}
                    setBookmarksTab={props.setBookmarksTab}
                    saveBookmarkedServicesOffset={props.saveBookmarkedServicesOffset}
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