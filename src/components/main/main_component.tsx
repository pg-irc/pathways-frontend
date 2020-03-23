// tslint:disable:no-expression-statement
import React, { useEffect } from 'react';
import { Container, Drawer, Root } from 'native-base';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { FooterComponent, FooterProps } from './footer_component';
import { HeaderMenuConnectedComponent } from '../header_menu/header_menu_connected_component';
import { RouterProps, goBack } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { Locale } from '../../locale';
import { HardwareBackButtonHandlerComponent } from './hardware_back_button_handler_component';
import { AppModalsComponent } from './app_modals_component';
import { Notifications } from 'expo';
import { History } from 'history';
import { notificationListener } from './notification';
import {
    CloseHeaderMenuAction, OpenHeaderMenuAction, CloseAboutModalAction,
    OpenAboutModalAction, CloseDisclaimerModalAction, OpenDisclaimerModalAction,
} from '../../stores/header_menu';
import { HeaderComponent } from './header_component';

export type MainComponentProps = MainProps & FooterProps & RouterProps;

export interface MainComponentActions {
    readonly sendAnalyticsData: (location: Location, locale: Locale) => RouteChangedAction;
    readonly closeHeaderMenu: () => CloseHeaderMenuAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly closeAboutModal: () => CloseAboutModalAction;
    readonly openAboutModal: () => OpenAboutModalAction;
    readonly closeDisclaimerModal: () => CloseDisclaimerModalAction;
    readonly openDisclaimerModal: () => OpenDisclaimerModalAction;
}

interface MainProps {
    readonly history: History;
    readonly locale: Locale;
    readonly localeIsSet: boolean;
    readonly showOnboarding: boolean;
    readonly isHeaderMenuVisible: boolean;
    readonly isAboutModalVisible: boolean;
    readonly isDisclaimerModalVisible: boolean;
}

type Props = MainComponentProps & MainComponentActions;

export const MainComponent = (props: Props): JSX.Element => {
    useEffect((): void => {
        props.history.listen((location: Location, _: Action): RouteChangedAction =>
            props.sendAnalyticsData(location, props.locale),
        );
        Notifications.addListener(notificationListener(props.history));
    }, []);

    const onHardwareBackButtonPress = (): boolean => {
        if (!props.isHeaderMenuVisible) {
            goBack(props.history);
        } else {
            props.closeHeaderMenu();
        }
        return true;
    };

    return (
        <Root>
            <Drawer
                side='right'
                onClose={(): CloseHeaderMenuAction => props.closeHeaderMenu()}
                open={props.isHeaderMenuVisible}
                content={
                    <HeaderMenuConnectedComponent
                        history={props.history}
                        closeMenu={(): CloseHeaderMenuAction => props.closeHeaderMenu()}
                        openAboutModal={(): OpenAboutModalAction => props.openAboutModal()}
                        openDisclaimerModal={(): OpenDisclaimerModalAction => props.openDisclaimerModal()}
                    />
                }
            >
                <Container>
                    <HeaderComponent
                        history={props.history}
                        location={props.location}
                        openMenu={(): OpenHeaderMenuAction => props.openHeaderMenu()}
                        closeAboutModal={(): CloseAboutModalAction => props.closeAboutModal()}
                        closeDisclaimerModal={(): CloseDisclaimerModalAction => props.closeDisclaimerModal()}
                    />
                    <MainPageSwitcherComponent {...props} />
                    <FooterComponent {...props} />
                    <HardwareBackButtonHandlerComponent onHardwareBackButtonPress={onHardwareBackButtonPress} />
                    <AppModalsComponent
                        isAboutVisible={props.isAboutModalVisible}
                        isDisclaimerVisible={props.isDisclaimerModalVisible}
                        closeAboutModal={(): CloseAboutModalAction => props.closeAboutModal()}
                        closeDisclaimerModal={(): CloseDisclaimerModalAction => props.closeDisclaimerModal()}
                    />
                </Container>
            </Drawer>
        </Root>
    );
};