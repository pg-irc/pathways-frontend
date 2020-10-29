import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Tab, Tabs, TabHeading, Content, Text, View } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction, SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { goToRouteWithParameter, RouterProps, Routes } from '../../application/routing';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { WebsiteComponent } from '../website/website_component';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { EmailComponent } from '../email/email_component';
import { HumanServiceData } from '../../validation/services/types';
import { SearchListSeparator } from '../search/separators';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { getOrganization } from '../../api';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { toHumanServiceData } from '../../validation/search/to_human_service_data';
import { SearchServiceData } from '../../validation/search/types';
import { ServiceListItemComponent } from '../services/service_list_item_component';
import { fetchServicesFromOrganization } from '../search/api/fetch_search_results_from_query';

export interface OrganizationDetailProps {
    readonly history: History;
    readonly organizationServicesOffset: number;
}

export interface OrganizationDetailActions {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}


interface AboutTabProps {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly organization: HumanOrganizationData;
}

type Props = OrganizationDetailProps & OrganizationDetailActions & RouterProps;

export const OrganizationDetailComponent = (props: Props): JSX.Element => {
    // NativeBase's (Buggy) Tabs component notes:
    //
    // - Breaking out the Tab and TabHeading components from the Tabs component does not work as
    //   they do not render in isolation, this makes our component a little harder to split up
    // - The activeTextStyle prop only works with a text heading, we need to use a component for
    //   translation purposes,
    //   see: https://stackoverflow.com/questions/43113859/customise-tabs-of-native-base,
    //   this means we cannot sensibly style active tab text

    const [organization, setOrganization]: readonly [HumanOrganizationData, (org: HumanOrganizationData)=> void] = useState(undefined);
    const [services, setOrganizationServices]: readonly [ReadonlyArray<SearchServiceData>, (services: ReadonlyArray<SearchServiceData>)=> void] = useState(undefined);
    const organizationId = props.match.params.organizationId;

    useEffect(() => {
        getOrganization(organizationId).then((res)=> {
            setOrganization(res.results)});
        fetchServicesFromOrganization(organizationId).then((res: ReadonlyArray<SearchServiceData>) => {
            setOrganizationServices(res)});
    }, []);

    if (!organization){
        return <EmptyComponent/>
    }

    return (
        <View style={{ flex: 1 }}>
            <OrganizationDetailHeader
                location={props.location}
                history={props.history}
                openHeaderMenu={props.openHeaderMenu}
            />
            <Content padder>
                <DescriptorComponent descriptor={<Trans>ORGANIZATION</Trans>} />
                <TitleComponent title={organization.name.toUpperCase()} />
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
                        <AboutTabComponent
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
                        <ServicesTabComponent
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
    );
};

interface OrganizationDetailHeaderProps {
    readonly location: Location;
    readonly history: History;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

const OrganizationDetailHeader = (props: OrganizationDetailHeaderProps): JSX.Element => {
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

const AboutTabComponent = (props: AboutTabProps ): JSX.Element => (
    <Content>
        <MarkdownBodyComponent
            body={props.organization.description}
            shouldBeExpandable={true}
            // TODO Issue #1080 When organization detail page is online connect the following 2 states to the store/persisted data
            showLinkAlerts={true}
            hideLinkAlerts={console.log} />
        <DividerComponent />
        <OrganizationContactDetailsComponent
            organization={props.organization}
            analyticsLinkPressed={props.analyticsLinkPressed}
            currentPathForAnalytics={props.currentPathForAnalytics}
        />
    </Content>
);

const OrganizationContactDetailsComponent = (props: AboutTabProps): JSX.Element => {
    const linkContextForAnalytics = buildAnalyticsLinkContext('Organization', props.organization.name);
    const currentPathForAnalytics = props.currentPathForAnalytics;
    return (
        <View>
            <WebsiteComponent
                website={props.organization.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <DividerComponent />
            <EmailComponent
                email={props.organization.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
        </View>
    );
};

interface ServicesTabProps {
    readonly services: ReadonlyArray<SearchServiceData>;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly history: History;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly organizationServicesOffset: number;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

export const ServicesTabComponent = (props: ServicesTabProps): JSX.Element => {

    const renderSearchHit = R.curry((props: ServicesTabProps, itemInfo: ListRenderItemInfo<SearchServiceData>): JSX.Element => {
        const item: SearchServiceData = itemInfo.item;
        const service: HumanServiceData = toHumanServiceData(item, []);
        const onPress = (): void => {
            props.openServiceDetail(service);
            goToRouteWithParameter(Routes.ServiceDetail, service.id, props.history)();
        };
    
        const onBookmark = (): BookmarkServiceAction => props.bookmarkService(service);
        const onUnbookmark = (): UnbookmarkServiceAction => props.unbookmarkService(service);
        return (
            <ServiceListItemComponent
                service={service}
                history={props.history}
                onPress={onPress}
                isBookmarked={service.bookmarked}
                onBookmark={onBookmark}
                onUnbookmark={onUnbookmark}
            />
        );
    });

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            <FlatList
                style={{ backgroundColor: colors.lightGrey, flex: 1  }}
                data={props.services}
                keyExtractor={keyExtractor}
                renderItem={renderSearchHit({
                    ...props
                })}
                ItemSeparatorComponent={SearchListSeparator}
            />
        </View>
    );
};

const keyExtractor = (item: SearchServiceData): string => (
    item.service_id
);