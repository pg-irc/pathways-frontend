// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Container, Drawer } from 'native-base';
import { HeaderComponent, HeaderProps } from './header';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { NotificationsConnectedComponent } from '../notifications/notifications_connected_component';
import { FooterComponent, FooterProps } from './footer';
import { ConnectedLanguageSwitcher } from '../language_switcher/connected_language_switcher';
import { RouterProps } from '../../application/routing';
import { Location, Action } from 'history';
import { RouteChangedAction } from '../../stores/router_actions';
import { NewlyRecommendedTasksConnectedComponent } from '../newly_recommended_tasks/newly_recommended_tasks_connected_component';

interface DrawerState {
    readonly isDrawerOpen: boolean;
}

export type Props = HeaderProps & FooterProps & RouterProps;

export interface Actions {
    readonly routeChanged: (location: Location, action: Action) => RouteChangedAction;
}

export type MainComponentProps = Props & Actions;

export class Component extends React.Component<MainComponentProps, DrawerState> {

    readonly state: DrawerState = {
        isDrawerOpen: false,
    };

    constructor(props: MainComponentProps) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        props.history.listen(props.routeChanged);
    }

    render(): JSX.Element {
        return (
            <Drawer open={this.state.isDrawerOpen}
                side='right'
                content={<ConnectedLanguageSwitcher />}
                onClose={this.closeDrawer} >
                <Container>
                    <HeaderComponent onLanguageSelect={this.openDrawer} {...this.props} />
                    <MainPageSwitcherComponent />
                    <FooterComponent {...this.props} />
                    <NotificationsConnectedComponent {...this.props} />
                    <NewlyRecommendedTasksConnectedComponent />
                </Container>
            </Drawer>
        );
    }

    private openDrawer(): void {
        this.setState({ isDrawerOpen: true });
    }

    private closeDrawer(): void {
        this.setState({ isDrawerOpen: false });
    }

}
