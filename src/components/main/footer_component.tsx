// tslint:disable: no-expression-statement
import { History, Location } from 'history';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import React, { useContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Keyboard, StyleProp, TextStyle, Platform } from 'react-native';
import Animated from 'react-native-reanimated';

import { Routes, goToRouteWithoutParameter, pathMatchesRoute, pathMatchesAnyRoute } from '../../application/routing';
import { colors, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { ScrollAnimationContext, ScrollContext } from '../main/main_component';

// Based from inspecting React Native's Element inspector
const FOOTER_HEIGHT: number = 55;
const FOOTER_SPACING: number = 35;

const AnimatedFooter = Animated.createAnimatedComponent(Footer);

const AnimatedFooterTab = Animated.createAnimatedComponent(FooterTab);

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const  { clampedScroll }: ScrollAnimationContext = useContext(ScrollContext);

    const footerHeight = Platform.OS === 'android' ? FOOTER_HEIGHT : FOOTER_HEIGHT + FOOTER_SPACING;

    // Animate Footer Height
    const footerTranslatedHeight = Animated.interpolate(clampedScroll, {
        inputRange: [0, footerHeight],
        outputRange: [footerHeight, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    // Animate Footer Tab Height
    const footerTabTranslatedHeight = Animated.interpolate(clampedScroll, {
        // Only translate the footer tab height once the extra spacing of the footer container is gone
        inputRange: [FOOTER_HEIGHT, footerHeight],
        outputRange: [FOOTER_HEIGHT, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    // Translate Footer Tab on the Y Axis
    // Needed for Android because icons are still displayed even when the height is already at minimum
    const footerTabTranslateY = Animated.interpolate(clampedScroll, {
        // Only translate the footer y axis once the extra spacing of the footer container is gone
        inputRange: [FOOTER_HEIGHT, footerHeight],
        outputRange: [0, footerHeight],
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
        <AnimatedFooter style={{ height: footerTranslatedHeight }}>
            <AnimatedFooterTab
                style={{
                    backgroundColor: colors.lightTeal,
                    height: footerTabTranslatedHeight,
                    transform: [{ translateY: footerTabTranslateY }],
                }}
            >
                {navigationButton(props.history, Routes.RecommendedTopics, 'home', isOnRecommendedTopicsPage(props))}
                {navigationButton(props.history, Routes.Learn, 'book', isOnLearnPage(props))}
                {navigationButton(props.history, Routes.Bookmarks, 'bookmark', isOnBookmarksPage(props))}
                {navigationButton(props.history, Routes.Search, 'search', isOnSearchPage(props))}
            </AnimatedFooterTab>
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
