import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { History, Location } from 'history';
import { Routes, goToRouteWithoutParameter, pathMatchesRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values } from '../../application/styles';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;
    const isOnWelcomeScreen = pathMatchesRoute(path, Routes.Welcome);
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);

    if (isOnWelcomeScreen) {
        return <EmptyComponent />;
    }

    if (isOnQuestionnaireScreen) {
        return <EmptyComponent />;
    }

    const bookmarkedIsActive = pathMatchesRoute(path, Routes.BookmarkedTopics);
    const recommendedTopicsActive = pathMatchesRoute(path, Routes.RecommendedTopics);
    const learnIsActive = pathMatchesRoute(path, Routes.Learn);

    return (
        <Footer>
            <FooterTab style={[{ backgroundColor: colors.lightTeal }]}>
                {navigationButton(props.history, Routes.RecommendedTopics, 'star', recommendedTopicsActive)}
                {navigationButton(props.history, Routes.Learn, 'book', learnIsActive)}
                {navigationButton(props.history, Routes.BookmarkedTopics, 'bookmark', bookmarkedIsActive)}
            </FooterTab>
        </Footer>
    );
};

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
