import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/react';
import { Tab, Tabs, TabHeading, Content, Text, View } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction, SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { RouterProps } from '../../application/routing';
import { analyticsLinkPressed, AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { HumanServiceData } from '../../validation/services/types';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction, openServiceDetail } from '../../stores/services/actions';
import { getOrganization } from '../../api';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { SearchServiceData } from '../../validation/search/types';
import { fetchServicesFromOrganization } from '../search/api/fetch_search_results_from_query';
import { OrganizationServiceListComponent } from './organization_service_list_component';
import { OrganizationDetailComponent } from './organization_detail_component';
import { I18n } from '@lingui/react';
import OrgTabSwitcher from './org_tab_swticher';

export interface OrganizationProps {
    readonly history: History;
    readonly organizationServicesOffset: number;
}

export interface OrganizationActions {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

type Props = OrganizationProps & OrganizationActions & RouterProps;

export const OrganizationComponent = (props: Props): JSX.Element => {
    // NativeBase's (Buggy) Tabs component notes:
    //
    // - Breaking out the Tab and TabHeading components from the Tabs component does not work as
    //   they do not render in isolation, this makes our component a little harder to split up
    // - The activeTextStyle prop only works with a text heading, we need to use a component for
    //   translation purposes,
    //   see: https://stackoverflow.com/questions/43113859/customise-tabs-of-native-base,
    //   this means we cannot sensibly style active tab text

    const [organization, setOrganization]: readonly [HumanOrganizationData, (org: HumanOrganizationData) => void] = useState(undefined);
    const [services, setOrganizationServices]: readonly [ReadonlyArray<SearchServiceData>, (services: ReadonlyArray<SearchServiceData>) => void] = useState(undefined);
    const organizationId = props.match.params.organizationId;

    useEffect(() => {
        getOrganization(organizationId).then((res) => {
            setOrganization(res.results)
        });
        fetchServicesFromOrganization(organizationId).then((res: ReadonlyArray<SearchServiceData>) => {
            setOrganizationServices(res)
        });
    }, []);

    if (!organization) {
        return <EmptyComponent />
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
                        <TitleComponent title={organization.name.toUpperCase()} />
                        <OrgTabSwitcher
                            i18n={i18n}
                            organization={organization}
                            services={services}
                            analyticsLinkPressed={analyticsLinkPressed}
                            history={props.history}
                            organizationServicesOffset={props.organizationServicesOffset}
                            saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
                            bookmarkService={props.bookmarkService}
                            unbookmarkService={props.unbookmarkService}
                            openServiceDetail={openServiceDetail}
                            openHeaderMenu={props.openHeaderMenu}
                            currentPathForAnalytics={props.location.pathname}
                             />
                        <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.teal }}>
                            <Tab
                                heading={
                                    <TabHeading style={{ backgroundColor: colors.white }}>
                                        <Text style={textStyles.paragraphStyle}>
                                            <Trans>About</Trans>
                                        </Text>
                                    </TabHeading>
                                }
                            >
                                <OrganizationDetailComponent
                                    organization={organization}
                                    analyticsLinkPressed={props.analyticsLinkPressed}
                                    currentPathForAnalytics={props.location.pathname}
                                />
                            </Tab>
                            <Tab
                                heading={
                                    <TabHeading style={{ backgroundColor: colors.white }}>
                                        <Text style={textStyles.paragraphStyle}>
                                            <Trans>Services</Trans>
                                        </Text>
                                    </TabHeading>
                                }
                            >
                                <OrganizationServiceListComponent
                                    services={services}
                                    history={props.history}
                                    bookmarkService={props.bookmarkService}
                                    unbookmarkService={props.unbookmarkService}
                                    openServiceDetail={props.openServiceDetail}
                                    analyticsLinkPressed={props.analyticsLinkPressed}
                                    currentPathForAnalytics={props.location.pathname}
                                    organizationServicesOffset={props.organizationServicesOffset}
                                    saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
                                />
                            </Tab>
                        </Tabs>
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

