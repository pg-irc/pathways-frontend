import React from 'react';
import { View } from 'react-native';
import * as R from 'ramda';
import { History, Location } from 'history';
import { Header, Left, Right } from 'native-base';
import { Id as TaskId, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/topics';
import { BackButtonComponent } from '../header_button/back_button_component';
import { HelpButtonComponent } from '../header_button/help_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { Locale } from '../../locale';
import {
    Routes, isOnParentScreen, isOnChildScreen, pathMatchesRoute, getParametersFromPath,
} from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { getStatusBarHeightForPlatform } from './get_status_bar_height_for_platform';
import { mapWithIndex } from '../../application/map_with_index';

type OwnProps = {
    readonly history: History;
    readonly location: Location;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
    readonly openMenu: () => void;
};

export interface HeaderProps {
    readonly currentLocale: Locale;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface HeaderActions {
    readonly addBookmark: (topicId: TaskId) => AddToSavedListAction;
    readonly removeBookmark: (topicId: TaskId) => RemoveFromSavedListAction;
}

type Props = OwnProps & HeaderProps & HeaderActions;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);
    const isOnTopicDetailScreen = pathMatchesRoute(path, Routes.TaskDetail);
    const isOnTopicServicesScreen = pathMatchesRoute(path, Routes.Services);
    const isOnHelpScreen = pathMatchesRoute(path, Routes.Help);
    const isOnOnboardingScreen = pathMatchesRoute(path, Routes.Onboarding);

    if (isOnQuestionnaireScreen || isOnOnboardingScreen) {
        return <EmptyComponent />;
    }

    if (isOnTopicDetailScreen) {
        return <TopicDetailScreenHeader {...props} />;
    }

    if (isOnTopicServicesScreen) {
        return (
            <TwoButtonHeader
                {...props}
                {...{ textColor: colors.white, backgroundColor: colors.teal }}
            />
        );
    }

    if (isOnHelpScreen) {
        return (
            <TwoButtonHeader
                {...props}
                {...{ textColor: colors.teal, backgroundColor: colors.white }}
            />
        );
    }

    if (isOnParentScreen(path)) {
        return <ParentScreenHeader {...props} />;
    }

    if (isOnChildScreen(path)) {
        return <ChildScreenHeader {...props} />;
    }

    return <EmptyComponent />;
};

const TopicDetailScreenHeader = (props: Props): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.TaskDetail);
    const topicId = params.topicId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(topicId, props.savedTasksIdList)}
            addBookmark={(): AddToSavedListAction => props.addBookmark(topicId)}
            removeBookmark={(): RemoveFromSavedListAction => props.removeBookmark(topicId)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.openMenu}
            locale={props.currentLocale}
            textColor={colors.black}
        />,
    ];
    return renderHeader(backgroundColor, leftButton, rightButtons);
};

interface BackAndMenuButtonsHeaderProps extends Props {
    readonly textColor: string;
    readonly backgroundColor: string;
}

const TwoButtonHeader = (props: BackAndMenuButtonsHeaderProps): JSX.Element => {
    const leftButton = <BackButtonComponent history={props.history} textColor={props.textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
            locale={props.currentLocale}
            textColor={props.textColor}
        />;
    return renderHeader(props.backgroundColor, leftButton, [rightButton]);
};

const ParentScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.teal;
    const backgroundColor = colors.white;
    const leftButton = <HelpButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
            locale={props.currentLocale}
            textColor={textColor}
        />;
    return renderHeader(backgroundColor, leftButton, [rightButton]);
};

const ChildScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
            locale={props.currentLocale}
            textColor={textColor}
        />;
    return renderHeader(backgroundColor, leftButton, [rightButton]);
};

const renderHeader = (backgroundColor: string, leftButton: JSX.Element, rightButtons: ReadonlyArray<JSX.Element>):
    JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    const renderRightButton = (button: JSX.Element, index: number): JSX.Element => (
        <View key={index}>
            {button}
        </View>
    );
    return (
        <Header style={{ marginTop, backgroundColor: backgroundColor, borderBottomColor: 'transparent' }}>
            <Left style={{ justifyContent: 'flex-end', paddingLeft: 5 }}>
                {leftButton}
            </Left>
            <Right style={{ alignItems: 'center' }}>
                {mapWithIndex(renderRightButton, rightButtons)}
            </Right>
        </Header>
    );
};
