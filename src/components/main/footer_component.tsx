// tslint:disable: no-expression-statement
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { StyleProp, TextStyle, Keyboard } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { History, Location } from 'history';
import { Routes, goToRouteWithoutParameter, pathMatchesRoute, pathMatchesAnyRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values } from '../../application/styles';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {

    const [keyboardIsVisible, setKeyboardIsVisible]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    useEffect((): () => void => {
        const keyboardOpens = (): void => {
            setKeyboardIsVisible(true);
        };

        const keyboardCloses = (): void => {
            setKeyboardIsVisible(false);
        };

        const addListener = (): void => {
            Keyboard.addListener('keyboardDidShow', keyboardOpens);
            Keyboard.addListener('keyboardDidHide', keyboardCloses);
        };

        const removeListener = (): void => {
            Keyboard.removeListener('keyboardDidShow', keyboardOpens);
            Keyboard.removeListener('keyboardDidHide', keyboardCloses);
        };

        addListener();
        return removeListener;
    }, [setKeyboardIsVisible]);

    if (isFooterHidden(props, keyboardIsVisible)) {
        return <EmptyComponent />;
    }

    return (
        <Footer>
            <FooterTab style={[{ backgroundColor: colors.lightTeal }]}>
                {navigationButton(props.history, Routes.RecommendedTopics, 'home', isOnRecommendedTopicsPage(props))}
                {navigationButton(props.history, Routes.Learn, 'book', isOnLearnPage(props))}
                {navigationButton(props.history, Routes.Bookmarks, 'bookmark', isOnBookmarksPage(props))}
                {navigationButton(props.history, Routes.Search, 'search', isOnSearchPage(props))}
            </FooterTab>
        </Footer>
    );
};

const isFooterHidden = (props: FooterProps, keyboardIsVisible: boolean): boolean => {
    if (keyboardIsVisible)
        return true;
    return pathMatchesAnyRoute(
        props.location.pathname,
        [Routes.Welcome, Routes.Questionnaire, Routes.Help, Routes.Onboarding],
    );
};

const isOnBookmarksPage = (props: FooterProps): boolean => (
    pathMatchesRoute(props.location.pathname, Routes.Bookmarks)
);

const isOnRecommendedTopicsPage = (props: FooterProps): boolean => (
    pathMatchesRoute(props.location.pathname, Routes.RecommendedTopics)
);

const isOnLearnPage = (props: FooterProps): boolean => (
    pathMatchesRoute(props.location.pathname, Routes.Learn)
);

const isOnSearchPage = (props: FooterProps): boolean => (
    pathMatchesRoute(props.location.pathname, Routes.Search)
);

const navigationButton = (history: History, route: Routes, icon: string, isActive: boolean): JSX.Element => (
    <Button vertical onPress={goToRouteWithoutParameter(route, history)} style={{ flexWrap: 'nowrap' }}>
        <Icon
            type='FontAwesome'
            name={icon}
            active={isActive}
            style={[
                {
                    fontSize: values.navigationIconSize,
                },
                textStyle(isActive),
            ]}
        />
    </Button>
);

const textStyle = (isActive: boolean): StyleProp<TextStyle> => (
    isActive ? { color: colors.white } : { color: colors.teal }
);
