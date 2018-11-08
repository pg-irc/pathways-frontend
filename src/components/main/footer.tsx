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

    const homeScreenIsActive = pathMatchesRoute(path, Routes.Home);
    const myPlanScreenIsActive = pathMatchesRoute(path, Routes.MyPlan);
    const learnScreenIsActive = pathMatchesRoute(path, Routes.Learn);

    return (
        <Footer style={applicationStyles.boxShadowAbove}>
            <FooterTab style={[{ backgroundColor: colors.white }]}>
                {navigationButton(props.history, Routes.Home, 'Home', 'home', homeScreenIsActive)}
                {navigationButton(props.history, Routes.MyPlan, 'My plan', 'th-list', myPlanScreenIsActive)}
                {navigationButton(props.history, Routes.Learn, 'Learn', 'book', learnScreenIsActive)}
            </FooterTab>
        </Footer>
    );
};

const navigationButton = (history: History, route: Routes, text: string, icon: string, isActive: boolean): JSX.Element => (
    <Button vertical onPress={goToRouteWithoutParameter(route, history)}>
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
        <Text style={textStyle(isActive)}><Trans>{text}</Trans></Text>
    </Button>
);

const textStyle = (isActive: boolean): StyleProp<TextStyle> => (
    isActive ? { color: colors.topaz } : { color: colors.darkerGrey }
);
