// tslint:disable: no-expression-statement
import { History, Location } from 'history';
// @ts-ignore variables is exported by native base but is not defined by the types file
import { Button, Footer, FooterTab, Icon, variables } from 'native-base';
import React, { useContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';

import { Routes, goToRouteWithoutParameter, pathMatchesRoute, pathMatchesAnyRoute } from '../../application/routing';
import { colors, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { ScrollAnimationContext, ScrollContext } from '../main/scroll_animation_context';
import { FeedbackScreen } from '../../stores/feedback/types';

const AnimatedFooter = Animated.createAnimatedComponent(Footer);

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
    readonly feedbackScreen: FeedbackScreen;
}

export interface NavigationButtonProps {
    readonly onPress: () => void;
    readonly icon: string;
    readonly isActive: boolean;
}

export interface FooterStyles {
    readonly height: number;
    readonly paddingBottom: number;
}

const NavigationButton = (props: NavigationButtonProps): JSX.Element => {
    const  { animatedFooterIconVerticalTranslate }: ScrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

    return (
        <Button vertical onPress={props.onPress} style={{ flexWrap: 'nowrap' }}>
            <AnimatedIcon
                type='FontAwesome'
                name={props.icon}
                active={props.isActive}
                style={{
                    fontSize: values.navigationIconSize,
                    color: props.isActive ? colors.white : colors.teal,
                    transform: [{ translateY: animatedFooterIconVerticalTranslate }],
                }}
            />
        </Button>
    );
};

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const  { animatedFooterHeight, animatedFooterBottomPadding }: ScrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

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
        <AnimatedFooter style={{ height: animatedFooterHeight, paddingBottom: animatedFooterBottomPadding }}>
            <FooterTab style={{ backgroundColor: colors.lightTeal }}>
                <NavigationButton
                    icon='home'
                    isActive={isOnRecommendedTopicsPage(props)}
                    onPress={goToRouteWithoutParameter(Routes.RecommendedTopics, props.history)}
                />
                <NavigationButton
                    icon='book'
                    isActive={isOnLearnPage(props)}
                    onPress={goToRouteWithoutParameter(Routes.Learn, props.history)}
                />
                <NavigationButton
                    icon='bookmark'
                    isActive={isOnBookmarksPage(props)}
                    onPress={goToRouteWithoutParameter(Routes.Bookmarks, props.history)}
                />
                 <NavigationButton
                    icon='search'
                    isActive={isOnSearchPage(props)}
                    onPress={goToRouteWithoutParameter(Routes.Search, props.history)}
                />
            </FooterTab>
        </AnimatedFooter>
    );
};

const isFooterHidden = (props: FooterProps, keyboardIsVisible: boolean): boolean => {
    if (keyboardIsVisible)
        return true;

    const isOnFeedbackScreen = props.feedbackScreen === FeedbackScreen.EditableServiceDetailPage;
    if (pathMatchesRoute(props.location.pathname, Routes.ServiceDetail) && isOnFeedbackScreen)
        return true;

    return pathMatchesAnyRoute(
        props.location.pathname,
        [Routes.Welcome, Routes.Questionnaire, Routes.Help, Routes.Onboarding, Routes.OtherFeedback],
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
