// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Container, Drawer } from 'native-base';
import { HeaderConnectedComponent } from './header_connected_component';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { NotificationsConnectedComponent } from '../notifications/notifications_connected_component';
import { FooterComponent, FooterProps } from './footer_component';
import { HeaderMenuConnectedComponent } from '../header_menu/header_menu_connected_component';
import { RouterProps, goBack } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { Locale } from '../../locale';
import { HardwareBackButtonHandlerComponent } from './hardware_back_button_handler_component';

export type MainComponentProps = MainProps & FooterProps & RouterProps;

export interface MainComponentActions {
    readonly sendAnalyticsData: (location: Location, locale: Locale) => RouteChangedAction;
}

interface MainProps {
    readonly locale: Locale;
}

type Props = MainComponentProps & MainComponentActions;

interface State {
    readonly isHeaderMenuShowing: boolean;
}

export class MainComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isHeaderMenuShowing: false,
        };
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onHardwareBackButtonPress = this.onHardwareBackButtonPress.bind(this);
    }

    componentDidMount(): void {
        this.props.history.listen((location: Location, _: Action) =>
            this.props.sendAnalyticsData(location, this.props.locale),
        );
    }

    render(): JSX.Element {
        return (
            <Drawer
                side='right'
                onClose={this.closeDrawer}
                open={this.state.isHeaderMenuShowing}
                content={
                    <HeaderMenuConnectedComponent
                        history={this.props.history}
                        closeMenu={this.closeDrawer}
                    />
                }
            >
                <Container>
                    <HeaderConnectedComponent
                        history={this.props.history}
                        location={this.props.location}
                        onHeaderMenuButtonPress={this.openDrawer}
                    />
                    <MainPageSwitcherComponent />
                    <FooterComponent {...this.props} />
                    <NotificationsConnectedComponent {...this.props} />
                    <HardwareBackButtonHandlerComponent onHardwareBackButtonPress={this.onHardwareBackButtonPress} />
                </Container>
            </Drawer>
        );
    }

    closeDrawer(): void {
        this.setState({ isHeaderMenuShowing: false });
    }

    openDrawer(): void {
        this.setState({ isHeaderMenuShowing: true });
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
