// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Container, Drawer } from 'native-base';
import { HeaderConnectedComponent } from './header_connected_component';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { NotificationsConnectedComponent } from '../notifications/notifications_connected_component';
import { FooterComponent, FooterProps } from './footer_component';
import { HeaderMenuConnectedComponent } from '../header_menu/header_menu_connected_component';
import { RouterProps } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { NewlyRecommendedTasksConnectedComponent } from '../newly_recommended_tasks/newly_recommended_tasks_connected_component';

interface HeaderMenuState {
    readonly isHeaderMenuShowing: boolean;
}

export type MainComponentProps = FooterProps & RouterProps;

export interface MainComponentActions {
    readonly routeChanged: (location: Location, action: Action) => RouteChangedAction;
}

type Props = MainComponentProps & MainComponentActions;

export class MainComponent extends React.Component<Props> {

    readonly state: HeaderMenuState = {
        isHeaderMenuShowing: false,
    };

    constructor(props: Props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        props.history.listen(props.routeChanged);
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
                    <NewlyRecommendedTasksConnectedComponent />
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
}
