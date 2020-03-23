import React from 'react';
import { History, Location } from 'history';
import { BackButtonComponent } from '../header_button/back_button_component';
import { HelpButtonComponent } from '../header_button/help_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import {
    Routes, isOnParentScreen, isOnChildScreen, pathMatchesRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { renderHeader } from './render_header';
import { OpenHeaderMenuAction } from '../../stores/header_menu';

export type HeaderOwnProps = {
    readonly history: History;
    readonly location: Location;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
};

type Props = HeaderOwnProps;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);
    const isOnOnboardingScreen = pathMatchesRoute(path, Routes.Onboarding);

    if (isOnQuestionnaireScreen || isOnOnboardingScreen) {
        return <EmptyComponent />;
    }

    if (isOnParentScreen(path)) {
        return <ParentScreenHeader {...props} />;
    }

    if (isOnChildScreen(path)) {
        return <ChildScreenHeader {...props} />;
    }

    return <EmptyComponent />;
};

const ParentScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.teal;
    const backgroundColor = colors.white;
    const leftButton = <HelpButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;
    return renderHeader({ backgroundColor, leftButton, rightButtons: [rightButton] });
};

const ChildScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;
    return renderHeader({ backgroundColor, leftButton, rightButtons: [rightButton] });
};