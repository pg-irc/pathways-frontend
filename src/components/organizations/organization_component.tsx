import React from 'react';
import { Trans } from '@lingui/react';
import { Content, View } from 'native-base';
import { colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction, SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { RouterProps } from '../../application/routing';
import { analyticsLinkPressed, AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { HumanServiceData, Id } from '../../validation/services/types';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { I18n } from '@lingui/react';
import OrgTabSwitcher from './org_tab_swticher';
import { LoadingServiceListComponent } from '../loading_screen/loading_service_list_component';
import { SaveOrganizationAction } from '../../stores/organization/action';

export interface OrganizationProps {
    readonly history: History;
    readonly organization: HumanOrganizationData;
    readonly servicesForOrganization: ReadonlyArray<HumanServiceData>;
    readonly organizationServicesOffset: number;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface OrganizationActions {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly saveOrganization: (organization: HumanOrganizationData) => SaveOrganizationAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

type Props = OrganizationProps & OrganizationActions & RouterProps;

export const OrganizationComponent = (props: Props): JSX.Element => {

    if (typeof props.organization == 'undefined') {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <LoadingServiceListComponent />
            </View>
        )
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
                    <Content padder>
                        <DescriptorComponent descriptor={<Trans>ORGANIZATION</Trans>} />
                        <TitleComponent title={props.organization.name.toUpperCase()} />
                        <OrgTabSwitcher
                            i18n={i18n}
                            organization={props.organization}
                            servicesForOrganization={props.servicesForOrganization}
                            bookmarkedServicesIds={props.bookmarkedServicesIds}
                            analyticsLinkPressed={analyticsLinkPressed}
                            history={props.history}
                            organizationServicesOffset={props.organizationServicesOffset}
                            saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
                            saveOrganization={props.saveOrganization}
                            bookmarkService={props.bookmarkService}
                            unbookmarkService={props.unbookmarkService}
                            openServiceDetail={props.openServiceDetail}
                            openHeaderMenu={props.openHeaderMenu}
                            currentPathForAnalytics={props.location.pathname}
                        />
                    </Content>
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

