// tslint:disable:no-expression-statement
import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Container, Drawer, Root } from 'native-base';
import { HeaderConnectedComponent } from './header_connected_component';
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

export type MainComponentProps = MainProps & FooterProps & RouterProps;

export interface MainComponentActions {
    readonly sendAnalyticsData: (location: Location, locale: Locale) => RouteChangedAction;
}

interface MainProps {
    readonly history: History;
    readonly locale: Locale;
    readonly localeIsSet: boolean;
    readonly showOnboarding: boolean;
}

type Props = MainComponentProps & MainComponentActions;

type BooleanSetterFunction = Dispatch<SetStateAction<boolean>>;

export const MainComponent = (props: Props): JSX.Element => {
    const [isHeaderMenuVisible, setIsHeaderMenuVisible]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const [isAboutModalVisible, setIsAboutModalVisible]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const [isDisclaimerModalVisible, setIsDisclaimerModalVisible]: readonly [boolean, BooleanSetterFunction] = useState(false);

    useEffect((): void => {
        props.history.listen((location: Location, _: Action): RouteChangedAction =>
            props.sendAnalyticsData(location, props.locale),
        );
        Notifications.addListener(notificationListener(props.history));
    }, []);

    const onHardwareBackButtonPress = (): boolean => {
        if (!isHeaderMenuVisible) {
            goBack(props.history);
        } else {
            setIsHeaderMenuVisible(false);
        }
        return true;
    };

    return (
        <Root>
            <Drawer
                side='right'
                onClose={(): void => setIsHeaderMenuVisible(false)}
                open={isHeaderMenuVisible}
                content={
                    <HeaderMenuConnectedComponent
                        history={props.history}
                        closeMenu={(): void => setIsHeaderMenuVisible(false)}
                        openAboutModal={(): void => setIsAboutModalVisible(true)}
                        openDisclaimerModal={(): void => setIsDisclaimerModalVisible(true)}
                    />
                }
            >
                <Container>
                    <HeaderConnectedComponent
                        history={props.history}
                        location={props.location}
                        openMenu={(): void => setIsHeaderMenuVisible(true)}
                        closeAboutModal={(): void => setIsAboutModalVisible(false)}
                        closeDisclaimerModal={(): void => setIsDisclaimerModalVisible(false)}
                    />
                    <MainPageSwitcherComponent {...props} />
                    <FooterComponent {...props} />
                    <HardwareBackButtonHandlerComponent onHardwareBackButtonPress={onHardwareBackButtonPress} />
                    <AppModalsComponent
                        isAboutVisible={isAboutModalVisible}
                        isDisclaimerVisible={isDisclaimerModalVisible}
                        closeAboutModal={(): void => setIsAboutModalVisible(false)}
                        closeDisclaimerModal={(): void => setIsDisclaimerModalVisible(false)}
                    />
                </Container>
            </Drawer>
        </Root>
    );
};