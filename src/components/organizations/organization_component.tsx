import React from 'react';
import { Trans } from '@lingui/react';
import { colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction, SaveOrganizationServicesScrollOffsetAction, SaveOrganizationTabAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { RouterProps } from '../../application/routing';
import { analyticsLinkPressed, AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { HumanServiceData, Id } from '../../validation/services/types';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { HumanOrganizationData, StatusForOrganization } from '../../validation/organizations/types';
import { I18n } from '@lingui/react';
import { OrganizationTabSwitcher } from './organization_tab_switcher';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { View } from 'react-native';
import * as constants from '../../application/constants';
import { ErrorScreenSwitcherComponent } from '../error_screens/error_screen_switcher_component';

export interface OrganizationProps {
    readonly history: History;
    readonly organization: HumanOrganizationData;
    readonly organizationStatus: StatusForOrganization;
    readonly organizationTab: number;
    readonly servicesForOrganization: ReadonlyArray<HumanServiceData>;
    readonly organizationServicesOffset: number;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface OrganizationActions {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveOrganizationTab: (index: number) => SaveOrganizationTabAction;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

type Props = OrganizationProps & OrganizationActions & RouterProps;

export const OrganizationComponent = (props: Props): JSX.Element => {

    if (props.organizationStatus.type === constants.LOADING_ORGANIZATION) {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <LoadingServiceListComponent />
            </View>
        );
    }

    if (props.organizationStatus.type === constants.ERROR_ORGANIZATION) {
        console.log(props.organizationStatus);
        return <ErrorScreenSwitcherComponent
            refreshScreen={(): void => console.log('hello world')}
            errorType={props.organizationStatus.errorMessageType} />;
    }

    return (
        <I18n>
            {({ i18n }: { readonly i18n: I18n }): JSX.Element => (
                <View style={{ flex: 1 }}>
                    <OrganizationHeader
                        location={props.location}
                        history={props.history}
                        openHeaderMenu={props.openHeaderMenu}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <DescriptorComponent descriptor={<Trans>ORGANIZATION</Trans>} />
                        <TitleComponent title={props.organization.name.toUpperCase()} />
                    </View>
                    <OrganizationTabSwitcher
                        i18n={i18n}
                        organization={props.organization}
                        organizationStatus={props.organizationStatus}
                        organizationTab={props.organizationTab}
                        servicesForOrganization={props.servicesForOrganization}
                        bookmarkedServicesIds={props.bookmarkedServicesIds}
                        analyticsLinkPressed={analyticsLinkPressed}
                        history={props.history}
                        organizationServicesOffset={props.organizationServicesOffset}
                        saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
                        bookmarkService={props.bookmarkService}
                        unbookmarkService={props.unbookmarkService}
                        openServiceDetail={props.openServiceDetail}
                        openHeaderMenu={props.openHeaderMenu}
                        saveOrganizationTab={props.saveOrganizationTab}
                        currentPathForAnalytics={props.location.pathname}
                    />
                </View>
            )}
        </I18n>
    );
};

interface OrganizationHeaderProps {
    readonly location: Location;
    readonly history: History;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

const OrganizationHeader = (props: OrganizationHeaderProps): JSX.Element => {
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={colors.black}
        />,
    ];
    return (
        <HeaderComponent
            backgroundColor={backgroundColor}
            leftButton={leftButton}
            rightButtons={rightButtons}
        />
    );
};