import React from 'react';
import { History, Location } from 'history';
import {
    Routes, pathMatchesRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
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

    return <EmptyComponent />;
};