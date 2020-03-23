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
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { renderHeader } from '../main/render_header';
import { OpenHeaderMenuAction } from '../../stores/header_menu';

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
            <Header {...props} />
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

const Header = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.white;
    const leftButton = <BackButtonComponent history={props.history} textColor={textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;
    return renderHeader({ backgroundColor, leftButton, rightButtons: [rightButton] });
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