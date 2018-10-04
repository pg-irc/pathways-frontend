import React from 'react';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { History, Location } from 'history';
import { Trans } from '@lingui/react';
import { Routes, routePathWithoutParameter, goToRouteWithoutParameter } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;

    const isOnWelcomeScreen = path === routePathWithoutParameter(Routes.Welcome);
    const isOnHelpScreen = path === routePathWithoutParameter(Routes.Help);
    const isOnHomeScreen = path === routePathWithoutParameter(Routes.Home);
    const isOnMyPlanScreen = path === routePathWithoutParameter(Routes.MyPlan);
    const isOnLearnScreen = path === routePathWithoutParameter(Routes.Learn);

    if (isOnWelcomeScreen || isOnHelpScreen) {
        return emptyComponent();
    }

    return (
        <Footer>
            <FooterTab style={{ backgroundColor: colors.blue }}>
                {navigationButton(props.history, Routes.Home, 'Home', 'home', isOnHomeScreen)}
                {navigationButton(props.history, Routes.MyPlan, 'My plan', 'clipboard-text', isOnMyPlanScreen)}
                {navigationButton(props.history, Routes.Learn, 'Learn', 'book-open-page-variant', isOnLearnScreen)}
            </FooterTab>
        </Footer>
    );
};

const navigationButton = (history: History, route: Routes, text: string, icon: string, isActive: boolean): JSX.Element => (
    <Button vertical style={buttonStyle(isActive)}
        onPress={goToRouteWithoutParameter(route, history)}>
        <Icon type='MaterialCommunityIcons' name={icon} active={isActive} style={textStyle(isActive)} />
        <Text style={textStyle(isActive)}><Trans>{text}</Trans></Text>
    </Button>
);

const buttonStyle = (isActive: boolean): ViewStyle => (
    isActive ? { backgroundColor: colors.white } : { backgroundColor: colors.blue }
);

const textStyle = (isActive: boolean): StyleProp<TextStyle> => (
    isActive ? { color: colors.darkGrey } : { color: colors.white }
);
