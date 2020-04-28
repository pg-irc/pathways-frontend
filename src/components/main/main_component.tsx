// tslint:disable:no-expression-statement
import React, { useEffect, useRef, EffectCallback } from 'react';
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
import { StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';

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

export interface ScrollAnimationContext {
    readonly scrollAnim: Animated.Value<number>;
    readonly offsetAnim: Animated.Value<number>;
    readonly clampedScroll: Animated.Node<number>;
}

export const ScrollContext = React.createContext<ScrollAnimationContext | undefined>(undefined);

export const MainComponent = (props: Props): JSX.Element => {
    const scrollAnim = useRef<Animated.Value<number>>(new Animated.Value(0));

    const offsetAnim = useRef<Animated.Value<number>>(new Animated.Value(0));

    const clampedScroll = useRef<Animated.Node<number>>(
        Animated.diffClamp(
            Animated.add(
              scrollAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: Animated.Extrapolate.CLAMP,
              }),
              offsetAnim.current,
            ),
            0,
            100,
        ),
    );

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

    const onHardwareBackButtonPress = (): boolean => {
        if (!props.isHeaderMenuVisible) {
            goBack(props.history);
        } else {
            props.closeHeaderMenu();
        }
        return true;
    };

    // Only pass the animation contexts, not the Ref object
    const scrollAnimationContext: ScrollAnimationContext  = {
        scrollAnim: scrollAnim.current,
        offsetAnim: offsetAnim.current,
        clampedScroll: clampedScroll.current,
    };

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
                    <MainPageSwitcherComponent {...props} />
                    <FooterComponent {...props} />
                    <HardwareBackButtonHandlerComponent onHardwareBackButtonPress={onHardwareBackButtonPress} />
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