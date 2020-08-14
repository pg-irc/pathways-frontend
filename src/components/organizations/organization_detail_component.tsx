import React, { useRef, useState } from 'react';
import { Trans } from '@lingui/react';
import { Tab, Tabs, TabHeading, Content, Text, View } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction, SaveOrganizationServicesOffsetAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { RouterProps } from '../../application/routing';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { WebsiteComponent } from '../website/website_component';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { EmailComponent } from '../email/email_component';
import { FlatList } from 'react-native-gesture-handler';
import { HumanServiceData } from '../../validation/services/types';
import { SearchListSeparator } from '../search/separators';
import { NativeSyntheticEvent, ScrollViewProperties } from 'react-native';
import { renderServiceItems } from '../services/render_service_items';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';
import { aString, aDate } from '../../application/helpers/random_test_values';

export interface OrganizationDetailProps {
    readonly history: History;
    readonly organizationServicesOffset: number;
}

export interface OrganizationDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesOffsetAction;
}

type Props = OrganizationDetailProps & OrganizationDetailActions & RouterProps;

const testOrganization = {
    "id": "9487864",
    "name": "Government of British Columbia",
    "description": "The provincial government is presided over by the Executive Council of British Columbia, which is comprised of the Cabinet Ministers appointed by the Premier. Elected Members of the Legislative Assembly (MLAs) represent provincial ridings across BC. The Legislative Assembly of BC convenes at the Parliament Buildings in Victoria.",
    "website": "http://www.gov.bc.ca",
    "email": "servicebc@gov.bc.ca"
  };

  const testServices: Array<HumanServiceData> = [
      {
        "id": "9506365",
        "name": "Abbott Gardens",
        "description": "Provides housing for single adults who are homeless at risk, of low income, or persons with disabilities who can live independently. Potential tenants apply through the BC Housing Registry.",
        "phoneNumbers": [],
        "addresses": [],
        "website": aString(),
        "email": aString(),
        "organizationName": '',
        "bookmarked": false,
        "lastVerifiedDate": aDate(),
      },
      {
        "id": "49174548",
        "name": "Aboriginal Coalition to End Homelessness (ACEH)",
        "description": "An island-wide coalition that creates spaces for the voices of Aboriginal community members and provides a culturally specific approach to Aboriginal (First Nations, Inuit, and Metis) homelessness on the traditional Coast Salish, Nuu-chah-nulth, and Kwakwaka’wakw territories. Focus is on advocating for housing and shelter; governance, policy, and resources; community building; and support services for Aboriginal people experiencing homelessness. Also provides regular activities including Indigenous Women's Circles, cooking classes, land-based learning opportunities, monthly building community events, health and wellness workshops, life-skills workshops and other cultural events for the Indigenous peoples experiencing homelessness. Office hours are 8:30am to 3:30 pm Monday to Friday. Works in collaboration with Greater Victoria Coalition to End Homelessness. Nonprofit society.",
        "phoneNumbers": [],
        "addresses": [],
        "website": aString(),
        "email": aString(),
        "organizationName": '',
        "bookmarked": false,
        "lastVerifiedDate": aDate(),
      }
]

interface OrganizationContactDetailsProps {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
}

export const OrganizationDetailComponent = (props: Props): JSX.Element => {
    // NativeBase's (Buggy) Tabs component notes:
    //
    // - Breaking out the Tab and TabHeading components from the Tabs component does not work as
    //   they do not render in isolation, this makes our component a little harder to split up
    // - The activeTextStyle prop only works with a text heading, we need to use a component for
    //   translation purposes,
    //   see: https://stackoverflow.com/questions/43113859/customise-tabs-of-native-base,
    //   this means we cannot sensibly style active tab text
    return (
        <View style={{ flex: 1 }}>
            <OrganizationDetailHeader
                location={props.location}
                history={props.history}
                openHeaderMenu={props.openHeaderMenu}
            />
            <Content padder>
                <DescriptorComponent descriptor={<Trans>ORGANIZATION</Trans>} />
                <TitleComponent title={testOrganization.name.toUpperCase()} />
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
                        <AboutTab
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
                        <ServicesTab 
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

const OrganizationDetailHeader = (props: {
    readonly location: Location;
    readonly history: History;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}): JSX.Element => {
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={colors.black} />;
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

const AboutTab = (props: OrganizationContactDetailsProps): JSX.Element => (
    <Content>
        <MarkdownBodyComponent
            body={testOrganization.description}
            shouldBeExpandable={true}
            //TODO Issue #1080 When organization detail page is online connect the following 2 states to the store/persisted data
            showLinkAlerts={true}
            hideLinkAlerts={console.log} />
        <DividerComponent />
        <AboutContactDetails
            analyticsLinkPressed={props.analyticsLinkPressed}
            currentPathForAnalytics={props.currentPathForAnalytics}
        />
    </Content>
);

const AboutContactDetails = (props: OrganizationContactDetailsProps): JSX.Element => {
    const linkContextForAnalytics = buildAnalyticsLinkContext('Organization', testOrganization.name);
    const currentPathForAnalytics = props.currentPathForAnalytics;
    return (
        <View>
            <WebsiteComponent
                website={testOrganization.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <DividerComponent />
            <EmailComponent
                email={testOrganization.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
        </View>
    );
};

interface OrganizationServicesProps {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly history: History;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly organizationServicesOffset: number;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesOffsetAction;
}

export const ServicesTab = (props: OrganizationServicesProps): JSX.Element => {
    const [organizationServicesOffset, setOrganizationServicesOffset]: readonly [number, (n: number) => void] = useState(props.organizationServicesOffset);
    const flatListRef = useRef<FlatList<HumanServiceData>>();
    // const services = getServicesIfValid(props.topicServicesOrError);

    // useEffect((): void => {
    //     if (testServices.length > 0) {
    //         flatListRef.current.scrollToOffset({ animated: false, offset: props.organizationServicesOffset });
    //     }
    // }, [props.organizationServicesOffset, testServices, flatListRef]);

    const onScrollEnd = (e: NativeSyntheticEvent<ScrollViewProperties>): void => {
        setOrganizationServicesOffset(e.nativeEvent.contentOffset.y);
    };

    return (
        <FlatList
        ref={flatListRef}
        onScrollEndDrag={onScrollEnd}
        style={{ backgroundColor: colors.lightGrey }}
        data={testServices}
        keyExtractor={(service: HumanServiceData): string => service.id}
        renderItem={renderServiceItems({
            ...props,
            scrollOffset: organizationServicesOffset,
            saveScrollOffset: props.saveOrganizationServicesOffset,
        })}
        ItemSeparatorComponent={SearchListSeparator}
        initialNumToRender={props.saveOrganizationServicesOffset ? testServices.length : 20}
        />
    );
}