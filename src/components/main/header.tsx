import React from 'react';
import { Header, Left, Button, Icon, Title, Body, Right } from 'native-base';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';
import { I18nManager } from 'react-native';
import { History, Location } from 'history';
import { BackButton } from 'react-router-native';
import { routePathWithoutParameter, Routes, goBack } from '../../application/routing';

export interface HeaderProps {
    readonly currentLocale: Locale;
    readonly history: History;
    readonly location: Location;
}

export interface UiActions {
    readonly onLanguageSelect: () => void;
}

export const HeaderComponent: React.StatelessComponent<HeaderProps & UiActions> = (props: HeaderProps & UiActions): JSX.Element => {
    const { onLanguageSelect, currentLocale }: HeaderProps & UiActions = props;

    if (props.location.pathname === routePathWithoutParameter(Routes.Welcome)) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    return (
        <Header>
            <Left>
                <Button transparent onPress={(): void => goBack(props.history)}>
                    <Icon name={ I18nManager.isRTL ? 'arrow-forward' : 'arrow-back' } />
                </Button>
                <BackButton />
            </Left>
            <Body>
                <Title>Pathways</Title>
            </Body>
            <Right>
                <CurrentLocale onPress={onLanguageSelect} locale={currentLocale} />
            </Right>
        </Header>
    );
};
