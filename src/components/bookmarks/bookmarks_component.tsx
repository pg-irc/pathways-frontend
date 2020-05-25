import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { RouterProps } from '../../application/routing';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { ReactI18nRenderProp } from '../../locale/types';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { ListActions } from './bookmarks_connected_component';
import { OpenServiceAction } from '../../stores/services/actions';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

export interface BookmarkActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
}

type Props = BookmarksProps & ListActions & RouterProps;

export const BookmarksComponent = (props: Props): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <HelpAndMenuButtonHeaderComponent
                openHeaderMenu={props.openHeaderMenu}
                history={props.history}
            />
            <TitleComponent />
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <TabSwitcher
                        i18n={i18nRenderProp.i18n}
                        bookmarkedTopics={props.bookmarkedTopics}
                        bookmarkedServices={props.bookmarkedServices}
                        bookmarkTopic={props.bookmarkTopic}
                        unbookmarkTopic={props.unbookmarkTopic}
                        bookmarkService={props.bookmarkService}
                        unbookmarkService={props.unbookmarkService}
                        openServiceDetail={props.openServiceDetail}
                        openHeaderMenu={props.openHeaderMenu}
                        history={props.history}
                        location={props.location}
                        match={props.match}
                    />
                )}
            </I18n>
        </View>
    );
};

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