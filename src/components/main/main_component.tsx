import React from 'react';
import { Container } from 'native-base';
import * as header from './header';
import * as mainPageSwitcher from './main_page_switcher';
import * as footer from './footer';

export type Props = header.Props & mainPageSwitcher.Props & footer.Props;
export type Actions = header.Actions & mainPageSwitcher.Actions & footer.Actions;

export const MainComponent: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <header.Component {...props} />
        <mainPageSwitcher.Component {...props} />
        <footer.Component {...props} />
    </Container >
);
