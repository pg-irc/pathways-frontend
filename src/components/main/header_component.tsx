import React from 'react';
import { Trans } from '@lingui/react';
import { History, Location } from 'history';
import { Text } from 'native-base';
import { Id as TaskId, UnbookmarkTopicAction, BookmarkTopicAction } from '../../stores/topics';
import { BackButtonComponent } from '../header_button/back_button_component';
import { HelpButtonComponent } from '../header_button/help_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import {
    Routes, isOnParentScreen, isOnChildScreen, pathMatchesRoute } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { Id as ServiceId } from '../../stores/services';
import { HumanServiceData } from '../../validation/services/types';
import { UnbookmarkServiceAction, BookmarkServiceAction } from '../../stores/services/actions';
import { ServiceDetailScreenHeaderConnectedComponent } from './service_detail_screen_header_connected_component';
import { renderHeader } from './render_header';

export type HeaderOwnProps = {
    readonly history: History;
    readonly location: Location;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
    readonly openMenu: () => void;
};

export interface HeaderProps {
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly bookmarkedServicesIds: ReadonlyArray<ServiceId>;
}

export interface HeaderActions {
    readonly bookmarkTopic: (topicId: TaskId) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: TaskId) => UnbookmarkTopicAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = HeaderOwnProps & HeaderProps & HeaderActions;

export const HeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const path = props.location.pathname;
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);
    const isOnServiceDetailScreen = pathMatchesRoute(path, Routes.ServiceDetail);
    const isOnTopicServicesScreen = pathMatchesRoute(path, Routes.Services);
    const isOnServiceSearchScreen = pathMatchesRoute(path, Routes.Search);
    const isOnHelpScreen = pathMatchesRoute(path, Routes.Help);
    const isOnOnboardingScreen = pathMatchesRoute(path, Routes.Onboarding);
    const isOnOrganizationDetailScreen = pathMatchesRoute(path, Routes.OrganizationDetail);

    if (isOnQuestionnaireScreen || isOnOnboardingScreen) {
        return <EmptyComponent />;
    }

    if (isOnServiceDetailScreen) {
        return <ServiceDetailScreenHeaderConnectedComponent {...props} />;
    }

    if (isOnTopicServicesScreen) {
        return (
            <TwoButtonHeader
                {...props}
                {...{ textColor: colors.white, backgroundColor: colors.teal }}
            />
        );
    }

    if (isOnServiceSearchScreen) {
        return (
            <SearchHeader
                title={<Text style={[textStyles.headlineH5StyleBlackCenter, { color: colors.white }]}><Trans>FIND A SERVICE</Trans></Text>}
                {...props}
                {...{ textColor: colors.white, backgroundColor: colors.teal }}
            />
        );
    }

    if (isOnHelpScreen) {
        return (
            <TwoButtonHeader
                {...props}
                {...{ textColor: colors.teal, backgroundColor: colors.white }}
            />
        );
    }

    if (isOnOrganizationDetailScreen) {
        return (
            <TwoButtonHeader
                {...props}
                {...{ textColor: colors.white, backgroundColor: colors.teal }}
            />
        );
    }

    if (isOnParentScreen(path)) {
        return <ParentScreenHeader {...props} />;
    }

    if (isOnChildScreen(path)) {
        return <ChildScreenHeader {...props} />;
    }

    return <EmptyComponent />;
};

interface BackAndMenuButtonsHeaderProps extends Props {
    readonly textColor: string;
    readonly backgroundColor: string;
    readonly title?: JSX.Element;
}

const TwoButtonHeader = (props: BackAndMenuButtonsHeaderProps): JSX.Element => {
    const leftButton = <BackButtonComponent history={props.history} textColor={props.textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
            textColor={props.textColor}
        />;
    return renderHeader({ ...props, leftButton, rightButtons: [rightButton] });
};

const SearchHeader = (props: BackAndMenuButtonsHeaderProps): JSX.Element => {
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
            textColor={props.textColor}
        />;
    return renderHeader({ ...props, rightButtons: [rightButton] });
};

const ParentScreenHeader = (props: Props): JSX.Element => {
    const textColor = colors.teal;
    const backgroundColor = colors.white;
    const leftButton = <HelpButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openMenu}
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
            onPress={props.openMenu}
            textColor={textColor}
        />;
    return renderHeader({ backgroundColor, leftButton, rightButtons: [rightButton] });
};