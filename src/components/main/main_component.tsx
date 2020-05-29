// tslint:disable:no-expression-statement
import React, { useEffect, EffectCallback } from 'react';
import { StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import { Container, Drawer, Root } from 'native-base';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { FooterComponent, FooterProps } from './footer_component';
import { HeaderMenuConnectedComponent } from '../header_menu/header_menu_connected_component';
import { RouterProps, goBack } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { Locale } from '../../locale';
import { AppModalsComponent } from './app_modals_component';
import { Notifications } from 'expo';
import { History } from 'history';
import { notificationListener } from './notification';
import {
    CloseHeaderMenuAction, OpenHeaderMenuAction, CloseAboutModalAction,
    OpenAboutModalAction, CloseDisclaimerModalAction, OpenDisclaimerModalAction,
} from '../../stores/user_experience/actions';
import { useHardwareBackButtonPress } from './use_hardware_back_button_press';
import { ScrollContext, createScrollAnimationContext } from './scroll_animation_context';
import { FeedbackScreen } from '../../stores/feedback/types';
import { CloseAction } from '../../stores/feedback';

export type MainComponentProps = MainProps & FooterProps & RouterProps;

export interface MainComponentActions {
    readonly sendAnalyticsData: (location: Location, locale: Locale) => RouteChangedAction;
    readonly closeHeaderMenu: () => CloseHeaderMenuAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly closeAboutModal: () => CloseAboutModalAction;
    readonly openAboutModal: () => OpenAboutModalAction;
    readonly closeDisclaimerModal: () => CloseDisclaimerModalAction;
    readonly openDisclaimerModal: () => OpenDisclaimerModalAction;
    readonly backOutOfFeedbackScreen: () => CloseAction;
}

interface MainProps {
    readonly history: History;
    readonly locale: Locale;
    readonly localeIsSet: boolean;
    readonly showOnboarding: boolean;
    readonly isHeaderMenuVisible: boolean;
    readonly isAboutModalVisible: boolean;
    readonly isDisclaimerModalVisible: boolean;
    readonly feedbackScreen: FeedbackScreen;
}

type Props = MainComponentProps & MainComponentActions;

export const MainComponent = (props: Props): JSX.Element => {
    useHardwareBackButtonPress((): boolean => {
        const shouldNotBubbleUpEvent = true;

        if (props.isHeaderMenuVisible) {
            props.closeHeaderMenu();
        } else if (props.feedbackScreen === FeedbackScreen.ServiceDetail) {
            props.backOutOfFeedbackScreen();
        } else {
            goBack(props.history);
        }

        return shouldNotBubbleUpEvent;
    });

    useEffect((): EffectCallback => {
        const unsubscribe = props.history.listen((location: Location, _: Action): RouteChangedAction =>
            props.sendAnalyticsData(location, props.locale),
        );
        return unsubscribe;
    }, []);

    useEffect((): EffectCallback => {
        const subscription = Notifications.addListener(notificationListener(props.history));
        return (): void => subscription.remove();
    }, []);

    const scrollAnimationContext = createScrollAnimationContext();

    return (
        <Root>
            <StatusBar translucent={true} />
            <Drawer
                side='right'
                onClose={props.closeHeaderMenu}
                open={props.isHeaderMenuVisible}
                content={
                    <HeaderMenuConnectedComponent
                        history={props.history}
                        closeMenu={props.closeHeaderMenu}
                        openAboutModal={props.openAboutModal}
                        openDisclaimerModal={props.openDisclaimerModal}
                    />
                }
            >
                <Container>
                    <ScrollContext.Provider value={scrollAnimationContext}>
                        <Animated.Code exec={scrollAnimationContext.animatedSearchHeaderAndFooter} />
                        <MainPageSwitcherComponent {...props} />
                        <FooterComponent
                            history={props.history}
                            location={props.location}
                            feedbackScreen={props.feedbackScreen}
                        />
                        <AppModalsComponent
                            isAboutModalVisible={props.isAboutModalVisible}
                            isDisclaimerModalVisible={props.isDisclaimerModalVisible}
                            closeAboutModal={props.closeAboutModal}
                            closeDisclaimerModal={props.closeDisclaimerModal}
                        />
                    </ScrollContext.Provider>
                </Container>
            </Drawer>
        </Root>
    );
};
