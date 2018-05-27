import React from 'react';
import { Container } from 'native-base';
import * as header from './app_header';
import * as pageSwitcher from './page_switcher';
import * as footer from './app_footer';

export type Props = header.Props & pageSwitcher.Props & footer.Props;
export type Actions = header.Actions & pageSwitcher.Actions & footer.Actions;

export const MainComponent: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <header.AppHeader {...props} />
        <pageSwitcher.PageSwitcher {...props} />
        <footer.AppFooter {...props} />
    </Container >
);
