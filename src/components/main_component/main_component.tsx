import React from 'react';
import { Container } from 'native-base';
import { Header, Props as HeaderProps, Actions as HeaderActions } from './header';
import { PageSwitcher, Props as SwitcherProps, Actions as SwitcherActions } from './page_switcher';
import { Footer, Props as FooterProps, Actions as FooterActions } from './footer';

export type Props = HeaderProps & SwitcherProps & FooterProps;
export type Actions = HeaderActions & SwitcherActions & FooterActions;

export const MainComponent: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <Header {...props} />
        <PageSwitcher {...props} />
        <Footer {...props} />
    </Container >
);
