import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { RouterProps } from '../../application/routing';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text, Container } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { ReactI18nRenderProp } from '../../locale/types';
import { TaskListActions } from '../topics/task_list_component';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

export interface BookmarkActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = BookmarksProps & BookmarkActions & TaskListActions & RouterProps ;

export const BookmarksComponent = (props: Props): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <HelpAndMenuButtonHeaderComponent {...props} />
            <Container style={{ backgroundColor: colors.lightGrey }}>
            <TitleComponent/>
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <TabSwitcher i18n={i18nRenderProp.i18n} {...props}/>
                )}
            </I18n>
        </Container>
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