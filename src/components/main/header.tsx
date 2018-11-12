import React from 'react';
import { Header, Left, Button, Icon, Right } from 'native-base';
import { CurrentLocale } from '../language_switcher/current_locale';
import { Locale } from '../../locale';
import { I18nManager, Image, Dimensions } from 'react-native';
import { History, Location } from 'history';
import { BackButton as ReactRouterBackButtonHack } from 'react-router-native';
import { Routes, goBack, isOnParentScreen, isOnChildScreen, pathMatchesRoute} from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
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

type Props = HeaderProps & UiActions;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;

    if (isOnParentScreen(path)) {
        return renderHeader(colors.topaz, renderArrivalAdvisorLogo(), props);
    }

    if (isOnChildScreen(path)) {
        return renderHeader(colors.lightGrey, renderBackButton(props), props);
    }

    return <EmptyComponent />;
};

const renderHeader = (backgroundColor: string, actionButton: JSX.Element, props: Props): JSX.Element => {
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
                <CurrentLocale
                    onPress={props.onLanguageSelect}
                    locale={props.currentLocale}
                    currentPath={props.location.pathname}
                />
            </Right>
        </Header>
    );
};

const renderBackButton = (props: Props): JSX.Element => {
    return (
        <Button transparent onPress={(): void => goBack(props.history)}>
            <Icon name={getIconForBackButton(props.location.pathname)} style={{ color: colors.black, fontWeight: 'bold' }} />
        </Button>
    );
};

const getIconForBackButton = (path: string): string => {
    const isLearnDetailScreen = pathMatchesRoute(path, Routes.LearnDetail);
    if (isLearnDetailScreen) {
        if (I18nManager.isRTL) {
            return 'arrow-forward';
        }
        return 'arrow-back';
    }
    return 'close';
};

const renderArrivalAdvisorLogo = (): JSX.Element => {
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
