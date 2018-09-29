import React from 'react';
import * as ReactNative from 'react-native';
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

    const isWelcome = path === routePathWithoutParameter(Routes.Welcome);
    const isHelp = path === routePathWithoutParameter(Routes.Help);
    const isHome = path === routePathWithoutParameter(Routes.Home);
    const isOnMyPlan = path === routePathWithoutParameter(Routes.MyPlan);
    const isOnLearn = path === routePathWithoutParameter(Routes.Learn);

    if (isWelcome || isHelp) {
        return emptyComponent();
    }

    return (
        <Footer>
            <FooterTab style={{ backgroundColor: colors.blue }}>
                <Button vertical style={buttonStyle(isHome)}
                    onPress={goToRouteWithoutParameter(Routes.Home, props.history)}>
                    <Icon name='home' active={isHome} style={textStyle(isHome)} />
                    <Text style={textStyle(isHome)}><Trans>Home</Trans></Text>
                </Button>
                <Button vertical style={buttonStyle(isOnMyPlan)}
                    onPress={goToRouteWithoutParameter(Routes.MyPlan, props.history)}>
                    <Icon name='camera' active={isOnMyPlan} style={textStyle(isOnMyPlan)} />
                    <Text style={textStyle(isOnMyPlan)}><Trans>My plan</Trans></Text>
                </Button>
                <Button vertical style={buttonStyle(isOnLearn)}
                    onPress={goToRouteWithoutParameter(Routes.Learn, props.history)}>
                    <Icon name='apps' active={isOnLearn} style={textStyle(isOnLearn)} />
                    <Text style={textStyle(isOnLearn)}><Trans>Learn</Trans></Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

const buttonStyle = (isActive: boolean): ReactNative.ViewStyle => (
    isActive ? { backgroundColor: colors.blue } : { backgroundColor: colors.lightGrey }
);

const textStyle = (isActive: boolean): ReactNative.StyleProp<ReactNative.TextStyle> => (
    isActive ? { color: colors.black } : { color: colors.darkGrey }
);
