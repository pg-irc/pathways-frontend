// tslint:disable:no-expression-statement
import React, { useEffect, EffectCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { Container, Drawer, Root } from 'native-base';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { FooterComponent, FooterProps } from './footer_component';
import { HeaderMenuConnectedComponent } from '../header_menu/header_menu_connected_component';
import { RouterProps, goBack, isServiceReviewScreen } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { LocaleCode } from '../../application/locales';
import { AppModalsComponent } from './app_modals_component';
import * as Notifications from 'expo-notifications';
import { notificationListener } from './notification';
import {
    CloseHeaderMenuAction, OpenHeaderMenuAction, CloseAboutModalAction,
    OpenAboutModalAction, CloseDisclaimerModalAction, OpenDisclaimerModalAction, CloseLanguageDrawerAction, CloseRegionDrawerAction,
} from '../../stores/user_experience/actions';
import { useHardwareBackButtonPress } from './use_hardware_back_button_press';
import { ScrollContext, createScrollAnimationContext } from './scroll_animation_context';
import { FeedbackScreen } from '../../stores/feedback/types';
import { CloseAction, BackFromContactInformationAction } from '../../stores/feedback';
import { memoryHistory } from '../../application';
import { OpenDiscardChangesModalAction } from '../../stores/reviews/actions';
import { RegionCode } from '../../validation/region/types';
import { LanguageDrawerConnectedComponent } from '../header_menu/language_drawer_connected_component';
import { RegionDrawerConnectedComponent } from '../header_menu/region_drawer_connected_component';

export type MainComponentProps = MainProps & FooterProps & RouterProps;

export interface MainComponentActions {
    readonly sendAnalyticsData: (location: Location, locale: LocaleCode) => RouteChangedAction;
    readonly closeHeaderMenu: () => CloseHeaderMenuAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly closeRegionDrawer: () => CloseRegionDrawerAction;
    readonly closeLanguageDrawer: () => CloseLanguageDrawerAction;
    readonly closeAboutModal: () => CloseAboutModalAction;
    readonly openAboutModal: () => OpenAboutModalAction;
    readonly closeDisclaimerModal: () => CloseDisclaimerModalAction;
    readonly openDisclaimerModal: () => OpenDisclaimerModalAction;
    readonly backOutOfFeedbackScreen: () => CloseAction;
    readonly backFromContactInformation: () => BackFromContactInformationAction;
    readonly openDiscardChangesModal: () => OpenDiscardChangesModalAction;
}

interface MainProps {
    readonly region: RegionCode;
    readonly locale: LocaleCode;
    readonly localeIsSet: boolean;
    readonly showOnboarding: boolean;
    readonly isHeaderMenuVisible: boolean;
    readonly isRegionDrawerVisible: boolean;
    readonly isLanguageDrawerVisible: boolean;
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
        } else if (props.feedbackScreen) {
            backFromFeedbackScreen();
        } else if (isServiceReviewScreen(memoryHistory)) {
            props.openDiscardChangesModal();
        } else {
            goBack(memoryHistory);
        }

        return shouldNotBubbleUpEvent;
    }, [props.feedbackScreen, props.isHeaderMenuVisible]);

    const backFromFeedbackScreen = (): void => {
        if (props.feedbackScreen === FeedbackScreen.ContactInformationPage) {
            goBack(memoryHistory);
            props.backFromContactInformation();
        } else if (props.feedbackScreen === FeedbackScreen.ExplainFeedback) {
            goBack(memoryHistory);
            props.backOutOfFeedbackScreen();
        } else {
            props.backOutOfFeedbackScreen();
        }
    };

    useEffect((): EffectCallback => {
        const unsubscribe = memoryHistory.listen((location: Location, _: Action): RouteChangedAction =>
            props.sendAnalyticsData(location, props.locale),
        );
        return unsubscribe;
    }, []);

    useEffect((): EffectCallback => {
        const subscription = Notifications.addNotificationResponseReceivedListener(notificationListener(memoryHistory));
        return (): void => subscription.remove();
    }, []);

    const scrollAnimationContext = createScrollAnimationContext();

    return (
        <Root>
            <StatusBar style='light' />
            <Drawer
                side='right'
                onClose={props.closeLanguageDrawer}
                open={props.isLanguageDrawerVisible}
                content={<LanguageDrawerConnectedComponent />}
            >
                <Drawer
                    side='right'
                    onClose={props.closeRegionDrawer}
                    open={props.isRegionDrawerVisible}
                    content={<RegionDrawerConnectedComponent />}
                >
                    <Drawer
                        side='right'
                        onClose={props.closeHeaderMenu}
                        open={props.isHeaderMenuVisible}
                        content={
                            <HeaderMenuConnectedComponent
                                history={memoryHistory}
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
                                    history={memoryHistory}
                                    location={props.location}
                                    feedbackScreen={props.feedbackScreen}
                                />
                                <AppModalsComponent
                                    isAboutModalVisible={props.isAboutModalVisible}
                                    isDisclaimerModalVisible={props.isDisclaimerModalVisible}
                                    region={props.region}
                                    closeAboutModal={props.closeAboutModal}
                                    closeDisclaimerModal={props.closeDisclaimerModal}
                                />
                            </ScrollContext.Provider>
                        </Container>
                    </Drawer>
                </Drawer>
            </Drawer>
        </Root>
    );
};
