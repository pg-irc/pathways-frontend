import React from 'react';
import { View } from 'react-native';
import * as R from 'ramda';
import { History, Location } from 'history';
import { BackButton as ReactRouterBackButtonHack } from 'react-router-native';
import { Header, Left, Right } from 'native-base';
import { Id as TaskId, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
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

export interface HeaderProps {
    readonly currentLocale: Locale;
    readonly history: History;
    readonly location: Location;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface HeaderActions {
    readonly onHeaderMenuButtonPress: () => void;
    readonly addBookmark: (taskId: TaskId) => AddToSavedListAction;
    readonly removeBookmark: (taskId: TaskId) => RemoveFromSavedListAction;
}

type Props = HeaderProps & HeaderActions;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);
    const isOnTopicDetailScreen = pathMatchesRoute(path, Routes.TaskDetail);

    if (isOnQuestionnaireScreen) {
        return <EmptyComponent />;
    }

    if (isOnTopicDetailScreen) {
        return <TopicDetailScreenHeader {...props} />;
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
    const taskId = params.taskId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(taskId, props.savedTasksIdList)}
            addBookmark={(): AddToSavedListAction => props.addBookmark(taskId)}
            removeBookmark={(): RemoveFromSavedListAction => props.removeBookmark(taskId)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.onHeaderMenuButtonPress}
            locale={props.currentLocale}
            textColor={colors.black}
        />,
    ];
    return renderHeader(backgroundColor, leftButton, rightButtons);
};

const ParentScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.teal;
    const backgroundColor = colors.white;
    const leftButton = <HelpButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.onHeaderMenuButtonPress}
            locale={props.currentLocale}
            textColor={textColor}
        />;
    return renderHeader(backgroundColor, leftButton, [rightButton]);
};

const ChildScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.onHeaderMenuButtonPress}
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
    // From the docs: "Connects the global back button on Android and tvOS to the router's history.
    // On Android, when the initial location is reached, the default back behavior takes over.
    // Just render one somewhere in your app."
    // Without this, the hardware back button on Android always minimizes the app.
    const reactRouterBackButtonHack: JSX.Element = <ReactRouterBackButtonHack />;
    return (
        <Header style={{ marginTop, backgroundColor: backgroundColor, borderBottomColor: 'transparent' }}>
            <Left style={{ justifyContent: 'flex-end', paddingLeft: 5 }}>
                {leftButton}
                {reactRouterBackButtonHack}
            </Left>
            <Right style={{ alignItems: 'center' }}>
                {mapWithIndex(renderRightButton , rightButtons)}
            </Right>
        </Header>
    );
};
