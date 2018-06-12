import React from 'react';
import { Header, Left, Button, Icon, Title, Body, Right } from 'native-base';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';

export interface Props {
    readonly canGoBack: boolean;
    readonly currentLocale: Locale;
}

export interface Actions {
    readonly goBack: () => void;
    readonly openLocaleSwitcher: () => void;
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const { canGoBack, goBack, openLocaleSwitcher, currentLocale }: Props & Actions = props;
    return (
        <Header>
            <Left>
                <Button transparent disabled={!canGoBack} onPress={goBack}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Pathways</Title>
            </Body>
            <Right>
                <CurrentLocale onPress={openLocaleSwitcher} locale={currentLocale} />
            </Right>
        </Header>
    );
};
