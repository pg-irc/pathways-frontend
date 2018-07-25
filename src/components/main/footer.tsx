import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { History, Location } from 'history';
import { values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { Routes, routePathWithoutParameter, goToRouteWithoutParameter } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;
    if (path === '/' || path === '/help') {
        return emptyComponent();
    }
    return (
        <Footer>
            <FooterTab>
                <Button vertical active={path === routePathWithoutParameter(Routes.Home)}
                        onPress={goToRouteWithoutParameter(Routes.Home, props.history)}>
                    <Icon name='home' />
                    <Text><Trans>Home</Trans></Text>
                </Button>
                <Button vertical active={path === routePathWithoutParameter(Routes.Questionnaire)}
                        onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}>
                    <Icon name='apps' />
                    <Text style={[{ fontSize: values.smallTextSize }]}><Trans>Questions</Trans></Text>
                </Button>
                <Button vertical active={path === routePathWithoutParameter(Routes.MyPlan)}
                        onPress={goToRouteWithoutParameter(Routes.MyPlan, props.history)}>
                    <Icon name='camera' />
                    <Text><Trans>My plan</Trans></Text>
                </Button>
                <Button vertical active={path === routePathWithoutParameter(Routes.Learn)}
                        onPress={goToRouteWithoutParameter(Routes.Learn, props.history)}>
                    <Icon active name='apps' />
                    <Text><Trans>Learn</Trans></Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};
