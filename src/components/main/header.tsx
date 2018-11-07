import React from 'react';
import { Header, Left, Button, Icon, Right } from 'native-base';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';
import { I18nManager, Image, Dimensions } from 'react-native';
import { History, Location } from 'history';
import { BackButton as ReactRouterBackButtonHack } from 'react-router-native';
import { routePathWithoutParameter, Routes, goBack, pathMatchesRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import * as R from 'ramda';
import { getStatusBarHeightForPlatform } from './get_status_bar_height_for_platform';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

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
    const path = props.location.pathname;

    if (pathMatchesRoute(path, Routes.Welcome)) {
        return <EmptyComponent />;
    }

    const marginTop = getStatusBarHeightForPlatform();
    const backButton = backButtonComponentIfShown(path, props.history);
    const localeButton: JSX.Element = <CurrentLocale onPress={onLanguageSelect} locale={currentLocale} />;

    // From the docs: "Connects the global back button on Android and tvOS to the router's history.
    // On Android, when the initial location is reached, the default back behavior takes over.
    // Just render one somewhere in your app."
    // Without this, the hardware back button on Android always minimizes the app.
    const reactRouterBackButtonHack: JSX.Element = <ReactRouterBackButtonHack />;

    return (
        <Header style={{ marginTop, backgroundColor: colors.topaz }}>
            <Left style={{ justifyContent: 'flex-end', paddingLeft: 5 }}>
                {backButton}
                {reactRouterBackButtonHack}
            </Left>
            <Right style={{ alignItems: 'center' }}>
                {localeButton}
            </Right>
        </Header>
    );
};

const backButtonComponentIfShown = (path: string, history: History): JSX.Element => (
    isBackButtonShown(path) ? backButtonComponent(path, history) : arrivalAdvisorLogoComponent()
);

const isBackButtonShown = (path: string): boolean => (
    R.not(R.contains(path, R.map(routePathWithoutParameter, [Routes.Home, Routes.MyPlan, Routes.Learn])))
);

const backButtonComponent = (path: string, history: History): JSX.Element => (
    <Button transparent onPress={(): void => goBack(history)}>
        <Icon name={getBackButtonIcon(path)} style={{ color: colors.white }}/>
    </Button>
);

const arrivalAdvisorLogoComponent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 15;
    return (
        <Image
            source={arrivalAdvisorGlyphLogo}
            resizeMode={'contain'}
            style={{
                width: logoSize,
                height: logoSize,
            }}
        />
    );
};

const getBackButtonIcon = (path: string): string => {
    const isOnHelpScreen = pathMatchesRoute(path, Routes.Help);
    const isOnTaskDetailServicesScreen = pathMatchesRoute(path, Routes.TaskDetailServices);

    if (isOnHelpScreen || isOnTaskDetailServicesScreen) {
        return 'close';
    }
    if (I18nManager.isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};
