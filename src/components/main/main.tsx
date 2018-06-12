import React from 'react';
import { Container, Drawer } from 'native-base';
import * as header from './header';
import * as mainPageSwitcher from './main_page_switcher';
import * as footer from './footer';
import { DrawerContainer as LanguageSwitcher } from '../language_switcher/drawer_container';

interface DrawerProps {
    readonly localeSwitcherOpen: boolean;
}

interface DrawerActions {
    readonly closeLocaleSwitcher: () => void;
}

export type Props = header.Props & mainPageSwitcher.Props & footer.Props & DrawerProps;
export type Actions = header.Actions & mainPageSwitcher.Actions & footer.Actions & DrawerActions;

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Drawer open={props.localeSwitcherOpen}
            content={<LanguageSwitcher />}
            onClose={props.closeLocaleSwitcher} >
        <Container>
            <header.Component {...props} />
            <mainPageSwitcher.Component {...props} />
            <footer.Component {...props} />
        </Container>
    </Drawer>
);
