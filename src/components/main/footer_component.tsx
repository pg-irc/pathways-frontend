// tslint:disable: no-expression-statement
import { History, Location } from 'history';
// @ts-ignore variables is exported by native base but is not defined by the types file
import { Button, Footer, FooterTab, Icon, variables } from 'native-base';
import React, { useContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Keyboard, StyleProp, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Routes, goToRouteWithoutParameter, pathMatchesRoute, pathMatchesAnyRoute } from '../../application/routing';
import { colors, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { ScrollAnimationContext, ScrollContext } from '../main/main_component';

const FOOTER_HEIGHT: number = 55;

const AnimatedFooter = Animated.createAnimatedComponent(Footer);

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export interface FooterStyles {
    readonly height: number;
    readonly paddingBottom: number;
}

const getFooterStyles = (): FooterStyles => {
    if (variables.isIphoneX) {
        return {
            height: FOOTER_HEIGHT + variables.Inset.portrait.bottomInset,
            paddingBottom: variables.Inset.portrait.bottomInset,
        };
    }

    return {
        height: FOOTER_HEIGHT,
        paddingBottom: 0,
    };
};

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const  { clampedScroll }: ScrollAnimationContext = useContext(ScrollContext);

    const { height, paddingBottom }: FooterStyles = getFooterStyles();

    const footerAnimatedHeight = Animated.interpolate(clampedScroll, {
        inputRange: [0, height],
        outputRange: [height, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const footerAnimatedBottomPadding = Animated.interpolate(clampedScroll, {
        inputRange: [0, paddingBottom],
        outputRange: [paddingBottom, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

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
        <AnimatedFooter style={{ height: footerAnimatedHeight, paddingBottom: footerAnimatedBottomPadding }}>
            <FooterTab style={{ backgroundColor: colors.lightTeal }}>
                {navigationButton(props.history, Routes.RecommendedTopics, 'home', isOnRecommendedTopicsPage(props))}
                {navigationButton(props.history, Routes.Learn, 'book', isOnLearnPage(props))}
                {navigationButton(props.history, Routes.Bookmarks, 'bookmark', isOnBookmarksPage(props))}
                {navigationButton(props.history, Routes.Search, 'search', isOnSearchPage(props))}
            </FooterTab>
        </AnimatedFooter>
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
