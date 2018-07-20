import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { History, Location } from 'history';
import { values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { Routes } from '../../application/routing';

export interface FooterProps {
    readonly history: History;
    readonly location: Location;
}

export const FooterComponent: React.StatelessComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    const path = props.location.pathname;
    if (path === '/') {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    return (
        <Footer>
            <FooterTab>
                <Button vertical active={path === Routes.home} onPress={(): void => props.history.push(Routes.home)}>
                    <Icon name='home' />
                    <Text><Trans>Home</Trans></Text>
                </Button>
                <Button vertical active={path === Routes.questionnaire} onPress={(): void => props.history.push(Routes.questionnaire)}>
                    <Icon name='apps' />
                    <Text style={[{fontSize: values.smallTextSize}]}><Trans>Questions</Trans></Text>
                </Button>
                <Button vertical active={path === Routes.myPlan} onPress={(): void => props.history.push(Routes.myPlan)}>
                    <Icon name='camera' />
                    <Text><Trans>My plan</Trans></Text>
                </Button>
                <Button vertical active={path === Routes.exploreSections} onPress={(): void => props.history.push(Routes.exploreSections)}>
                    <Icon active name='apps' />
                    <Text><Trans>Learn</Trans></Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};
