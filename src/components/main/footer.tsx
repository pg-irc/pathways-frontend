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
            <FooterTab style={footerStyle()}>
                <Button vertical active={isHome} style={buttonStyle(isHome)}
                    onPress={goToRouteWithoutParameter(Routes.Home, props.history)}>
                    <Icon name='home' style={textStyle(isHome)} />
                    <Text style={textStyle(isHome)}><Trans>Home</Trans></Text>
                </Button>
                <Button vertical active={isOnMyPlan} style={buttonStyle(isOnMyPlan)}
                    onPress={goToRouteWithoutParameter(Routes.MyPlan, props.history)}>
                    <Icon name='camera' style={textStyle(isOnMyPlan)} />
                    <Text style={textStyle(isOnMyPlan)}><Trans>My plan</Trans></Text>
                </Button>
                <Button vertical active={isOnLearn} style={buttonStyle(isOnLearn)}
                    onPress={goToRouteWithoutParameter(Routes.Learn, props.history)}>
                    <Icon name='apps' style={textStyle(isOnLearn)} />
                    <Text style={textStyle(isOnLearn)}><Trans>Learn</Trans></Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

const footerStyle = (): ReactNative.ViewStyle => (
    { backgroundColor: colors.blue }
);

const buttonStyle = (isActive: boolean): ReactNative.ViewStyle => (
    isActive ? { backgroundColor: colors.blue } : { backgroundColor: colors.lightGrey }
);

// tslint:disable-next-line:no-any
const textStyle = (isActive: boolean): ReactNative.StyleProp<ReactNative.TextStyle> => (
    isActive ? { color: colors.white } : { color: colors.darkGrey }
);
