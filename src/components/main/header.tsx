import React from 'react';
import { Header, Text, Left, Button, Icon, Right } from 'native-base';
import { Trans } from '@lingui/react';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';
import { I18nManager, StatusBar, Platform } from 'react-native';
import { History, Location } from 'history';
import { BackButton } from 'react-router-native';
import { routePathWithoutParameter, Routes, goBack, goToRouteWithoutParameter } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';

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
        return emptyComponent();
    }

    const marginTop = getMarginForPlatform();
    return (
        <Header style={{ marginTop }}>
            <Left>
                <Button transparent onPress={(): void => goBack(props.history)}>
                    <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} />
                </Button>
                <BackButton />
            </Left>
            <Right>
                <HelpButton onPress={(): void => goToRouteWithoutParameter(Routes.Help, props.history)} />
                <CurrentLocale onPress={onLanguageSelect} locale={currentLocale} />
            </Right>
        </Header>
    );
};

interface ButtonActions {
    readonly onPress: () => void;
}

const HelpButton: React.StatelessComponent<ButtonActions> = (props: ButtonActions): JSX.Element => (
    <Button {...props} style={{ backgroundColor: 'green' }}>
        <Icon name='help-circle' />
        <Text><Trans>NEED HELP?</Trans></Text>
    </Button>
);

const getMarginForPlatform = (): number => (
    Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
);
