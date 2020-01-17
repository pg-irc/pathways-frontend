// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
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

interface State {
    readonly isHeaderMenuShowing: boolean;
    readonly isAboutModalOpen: boolean;
    readonly isDisclaimerModalOpen: boolean;
}

export class MainComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isHeaderMenuShowing: false,
            isAboutModalOpen: false,
            isDisclaimerModalOpen: false,
        };
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onHardwareBackButtonPress = this.onHardwareBackButtonPress.bind(this);
        this.openAboutModal = this.openAboutModal.bind(this);
        this.openDisclaimerModal = this.openDisclaimerModal.bind(this);
        this.closeAboutModal = this.closeAboutModal.bind(this);
        this.closeDisclaimerModal = this.closeDisclaimerModal.bind(this);
    }

    componentDidMount(): void {
        this.props.history.listen((location: Location, _: Action) =>
            this.props.sendAnalyticsData(location, this.props.locale),
        );
        Notifications.addListener(notificationListener(this.props.history));
    }

    render(): JSX.Element {
        return (
            <Root>
                <Drawer
                    side='right'
                    onClose={this.closeDrawer}
                    open={this.state.isHeaderMenuShowing}
                    content={
                        <HeaderMenuConnectedComponent
                            history={this.props.history}
                            closeMenu={this.closeDrawer}
                            openAboutModal={this.openAboutModal}
                            openDisclaimerModal={this.openDisclaimerModal}
                        />
                    }
                >
                    <Container>
                        <HeaderConnectedComponent
                            history={this.props.history}
                            location={this.props.location}
                            openMenu={this.openDrawer}
                            closeAboutModal={this.closeAboutModal}
                            closeDisclaimerModal={this.closeDisclaimerModal}
                        />
                        <MainPageSwitcherComponent {...this.props} />
                        <FooterComponent {...this.props} />
                        <HardwareBackButtonHandlerComponent onHardwareBackButtonPress={this.onHardwareBackButtonPress} />
                        <AppModalsComponent
                            isAboutVisible={this.state.isAboutModalOpen}
                            isDisclaimerVisible={this.state.isDisclaimerModalOpen}
                            closeAboutModal={this.closeAboutModal}
                            closeDisclaimerModal={this.closeDisclaimerModal}
                        />
                    </Container>
                </Drawer>
            </Root>
        );
    }

    closeDrawer(): void {
        this.setState({ isHeaderMenuShowing: false });
    }

    openDrawer(): void {
        this.setState({ isHeaderMenuShowing: true });
    }

    closeAboutModal(): void {
        this.setState({ isAboutModalOpen: false });
    }

    openAboutModal(): void {
        this.setState({ isAboutModalOpen: true });
    }

    closeDisclaimerModal(): void {
        this.setState({ isDisclaimerModalOpen: false });
    }

    openDisclaimerModal(): void {
        this.setState({ isDisclaimerModalOpen: true });
    }

    onHardwareBackButtonPress(): boolean {
        if (this.state.isHeaderMenuShowing) {
            this.closeDrawer();
        } else {
            goBack(this.props.history);
        }
        return true;
    }
}
