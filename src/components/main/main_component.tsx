// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Container, Drawer } from 'native-base';
import { HeaderComponent, HeaderProps } from './header';
import { MainPageSwitcherComponent } from './main_page_switcher';
import { NotificationsConnectedComponent } from '../notifications/notifications_connected_component';
import { FooterComponent, FooterProps } from './footer';
import { ConnectedLanguageSwitcher } from '../language_switcher/connected_language_switcher';
import { RouterProps } from '../../application/routing';

interface LanguageSwitcherState {
    readonly isLanguageSwitcherShowing: boolean;
}

export type MainComponentProps = HeaderProps & FooterProps & RouterProps;

export class MainComponent extends React.Component<MainComponentProps> {

    readonly state: LanguageSwitcherState = {
        isLanguageSwitcherShowing: false,
    };

    constructor(props: MainComponentProps) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    render(): JSX.Element {
        return (
            <Drawer open={this.state.isLanguageSwitcherShowing}
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
        this.setState({ isLanguageSwitcherShowing: true });
    }

    private closeDrawer(): void {
        this.setState({ isLanguageSwitcherShowing: false });
    }

}
