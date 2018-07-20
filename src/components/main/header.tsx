import React from 'react';
import { Header, Text, Left, Button, Icon, Right } from 'native-base';
import { Trans } from '@lingui/react';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';
import { I18nManager, StatusBar, Platform } from 'react-native';
import { History, Location } from 'history';
import { BackButton } from 'react-router-native';
import { routePathWithoutParameter, Routes, goBack, goToRouteWithoutParameter } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';

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
        return <EmptyComponent />;
    }

    const marginTop = getStatusBarHeightForPlatform();

    return (
        <Header style={{ marginTop }}>
            <Left>
                <Button transparent onPress={(): void => goBack(props.history)}>
                    <Icon name={getBackButtonIcon(props.location.pathname)} />
                </Button>
                <BackButton />
            </Left>
            <Right>
                {helpButtonIfShown(props)}
                <CurrentLocale onPress={onLanguageSelect} locale={currentLocale} />
            </Right>
        </Header>
    );
};

const getBackButtonIcon = (pathname: string): string => {
    if (pathname === routePathWithoutParameter(Routes.Help)) {
        return 'close';
    }
    if (I18nManager.isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};

interface ButtonActions {
    readonly onPress: () => void;
}

const helpButtonIfShown = (props: HeaderProps): JSX.Element => {
    const showHelpButton = props.location.pathname !== routePathWithoutParameter(Routes.Help);
    if (!showHelpButton) {
        return <EmptyComponent />;
    }
    const onPress = goToRouteWithoutParameter(Routes.Help, props.history);
    return <HelpButton onPress={onPress} />;
};

const HelpButton: React.StatelessComponent<ButtonActions> = (props: ButtonActions): JSX.Element => (
    <Button {...props} style={{ backgroundColor: '#0066ff' }}>
        <Icon name='help-circle' />
        <Text><Trans>NEED HELP?</Trans></Text>
    </Button>
);

const getStatusBarHeightForPlatform = (): number => (
    Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
);
