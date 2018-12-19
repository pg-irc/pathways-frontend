import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { History, Location } from 'history';
import { Trans } from '@lingui/react';
import { Routes, goToRouteWithoutParameter, pathMatchesRoute, isOnStartScreen, isOnChildScreen } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values, applicationStyles } from '../../application/styles';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;

    if (isOnStartScreen(path)) {
        return <EmptyComponent />;
    }

    if (isOnChildScreen(path)) {
        return <EmptyComponent />;
    }

    const homeIsActive = pathMatchesRoute(path, Routes.Home);
    const recommendedTopicsActive = pathMatchesRoute(path, Routes.RecommendedTopics);
    const learnIsActive = pathMatchesRoute(path, Routes.Learn);
    const helpIsActive = pathMatchesRoute(path, Routes.Help);

    return (
        <Footer style={applicationStyles.boxShadowAbove}>
            <FooterTab style={[{ backgroundColor: colors.white }]}>
                {navigationButton(props.history, Routes.RecommendedTopics, <Trans>Rec..</Trans>, 'th-list', recommendedTopicsActive)}
                {navigationButton(props.history, Routes.Home, <Trans>Home</Trans>, 'home', homeIsActive)}
                {navigationButton(props.history, Routes.Learn, <Trans>Learn</Trans>, 'book', learnIsActive)}
                {navigationButton(props.history, Routes.Help, <Trans>Help</Trans>, 'question', helpIsActive)}
            </FooterTab>
        </Footer>
    );
};

const navigationButton = (history: History, route: Routes, label: JSX.Element, icon: string, isActive: boolean): JSX.Element => (
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
        <Text style={textStyle(isActive)}>{label}</Text>
    </Button>
);

const textStyle = (isActive: boolean): StyleProp<TextStyle> => (
    isActive ? { color: colors.topaz } : { color: colors.darkerGrey }
);
