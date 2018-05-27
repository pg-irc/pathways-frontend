import React from 'react';
import { Container } from 'native-base';
import * as header from './header';
import * as pageSwitcher from './page_switcher';
import * as footer from './footer';

export type Props = header.Props & pageSwitcher.Props & footer.Props;
export type Actions = header.Actions & pageSwitcher.Actions & footer.Actions;

export const MainComponent: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <header.Header {...props} />
        <pageSwitcher.PageSwitcher {...props} />
        <footer.Footer {...props} />
    </Container >
);
