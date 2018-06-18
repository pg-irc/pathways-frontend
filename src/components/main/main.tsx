// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Container, Drawer } from 'native-base';
import * as header from './header';
import * as mainPageSwitcher from './main_page_switcher';
import * as footer from './footer';
import { ConnectedLanguageSwitcher } from '../language_switcher/connected_language_switcher';

interface DrawerState {
    readonly isDrawerOpen: boolean;
}

export type Props = header.Props & mainPageSwitcher.Props & footer.Props;
export type Actions = header.Actions & mainPageSwitcher.Actions & footer.Actions;

export class Component extends React.Component<Props & Actions, DrawerState> {

    readonly state: DrawerState = {
        isDrawerOpen: false,
    };

    constructor(props: Props & Actions) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    render(): JSX.Element {
        return (
            <Drawer open={this.state.isDrawerOpen}
                    side='right'
                    content={<ConnectedLanguageSwitcher />}
                    onClose={this.closeDrawer} >
                <Container>
                    <header.Component onLanguageSelect={this.openDrawer} {...this.props} />
                    <mainPageSwitcher.Component {...this.props} />
                    <footer.Component {...this.props} />
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
