import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { History, Location } from 'history';
import { Trans } from '@lingui/react';
import { Routes, goToRouteWithoutParameter, pathMatchesRoute } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';
import { colors, values, applicationStyles } from '../../application/styles';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;

    const isOnHomeScreen = pathMatchesRoute(path, Routes.Home);
    const isOnMyPlanScreen = pathMatchesRoute(path, Routes.MyPlan);
    const isOnLearnScreen = pathMatchesRoute(path, Routes.Learn);

    if (!(isOnHomeScreen || isOnMyPlanScreen || isOnLearnScreen)) {
        return emptyComponent();
    }

    return (
        <Footer style={applicationStyles.boxShadowAbove}>
            <FooterTab style={[{ backgroundColor: colors.white }]}>
                {navigationButton(props.history, Routes.Home, 'Home', 'home', isOnHomeScreen)}
                {navigationButton(props.history, Routes.MyPlan, 'My plan', 'check', isOnMyPlanScreen)}
                {navigationButton(props.history, Routes.Learn, 'Learn', 'book', isOnLearnScreen)}
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
