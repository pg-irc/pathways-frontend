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
import * as constants from '../../application/constants';
import * as helpers from '../../stores/helpers/make_action';

interface State {
    readonly isDrawerOpen: boolean;
}

export type RouteChangedAction = Readonly<ReturnType<typeof routeChanged>>;

// tslint:disable-next-line:typedef
export const routeChanged = (location: Location) => (
    helpers.makeAction(constants.CLEAR_ERROR_STATE, { location })
);

export interface Actions {
    readonly routeChanged: (location: Location, action: Action) => RouteChangedAction;
}

export type Props = HeaderProps & FooterProps & RouterProps;

export type MainComponentProps = Props & Actions;

export class Component extends React.Component<MainComponentProps, State> {

    readonly state: State = {
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
                    <NotificationsConnectedComponent {...this.props} />
                    <FooterComponent {...this.props} />
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
