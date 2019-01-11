import React from 'react';
import { Header, Left, Button, Icon, Right } from 'native-base';
import { HeaderMenuButtonComponent } from '../header_menu/header_menu_button_component';
import { Locale } from '../../locale';
import { I18nManager } from 'react-native';
import { History, Location } from 'history';
import { BackButton as ReactRouterBackButtonHack } from 'react-router-native';
import { Routes, goBack, isOnParentScreen, isOnChildScreen, pathMatchesRoute, goToRouteWithoutParameter } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, values } from '../../application/styles';
import { getStatusBarHeightForPlatform } from './get_status_bar_height_for_platform';

export interface HeaderProps {
    readonly currentLocale: Locale;
    readonly history: History;
    readonly location: Location;
}

export interface UiActions {
    readonly onHeaderMenuButtonPress: () => void;
}

type Props = HeaderProps & UiActions;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);

    if (isOnQuestionnaireScreen) {
        return <EmptyComponent />;
    }

    if (isOnParentScreen(path)) {
        return <ParentScreenHeader {...props} />;
    }

    if (isOnChildScreen(path)) {
        return <ChildScreenHeader {...props} />;
    }

    return <EmptyComponent />;
};

const ParentScreenHeader = (props: Props): JSX.Element => {
    const headerMenuButton =
        <HeaderMenuButtonComponent
            onPress={props.onHeaderMenuButtonPress}
            locale={props.currentLocale}
            textColor={colors.white}
        />;

    return renderHeader(colors.topaz, <HelpButton {...props} />, headerMenuButton);
};

const ChildScreenHeader = (props: Props): JSX.Element => {
    const headerMenuButton =
        <HeaderMenuButtonComponent
            onPress={props.onHeaderMenuButtonPress}
            locale={props.currentLocale}
            textColor={colors.black}
        />;
    return renderHeader(colors.lightGrey, <BackButton {...props} />, headerMenuButton);
};

const renderHeader = (backgroundColor: string, actionButton: JSX.Element, headerMenuButton: JSX.Element): JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    // From the docs: "Connects the global back button on Android and tvOS to the router's history.
    // On Android, when the initial location is reached, the default back behavior takes over.
    // Just render one somewhere in your app."
    // Without this, the hardware back button on Android always minimizes the app.
    const reactRouterBackButtonHack: JSX.Element = <ReactRouterBackButtonHack />;
    return (
        <Header style={{ marginTop, backgroundColor: backgroundColor }}>
            <Left style={{ justifyContent: 'flex-end', paddingLeft: 5 }}>
                {actionButton}
                {reactRouterBackButtonHack}
            </Left>
            <Right style={{ alignItems: 'center' }}>
                {headerMenuButton}
            </Right>
        </Header>
    );
};

const BackButton = (props: Props): JSX.Element => {
    return (
        <Button transparent onPress={(): void => goBack(props.history)}>
            <Icon name={getIconForBackButton()} style={{ color: colors.black, fontWeight: 'bold' }} />
        </Button>
    );
};

const getIconForBackButton = (): string => {
    if (I18nManager.isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};

const HelpButton = (props: Props): JSX.Element => (
    <Button onPress={goToRouteWithoutParameter(Routes.Help, props.history)} transparent icon>
        <Icon
            type='FontAwesome'
            name='question-circle'
            style={{ color: colors.white, fontSize: values.mediumIconSize }}
        />
    </Button>
);
