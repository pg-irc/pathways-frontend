import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View } from 'react-native';
import { Tab, Tabs, TabHeading, Content } from 'native-base';
import { textStyles, colors, values } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History, Location } from 'history';
import { RouterProps } from '../../application/routing';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';

export interface OrganizationDetailProps {
    readonly history: History;
}

export interface OrganizationDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = OrganizationDetailProps & OrganizationDetailActions & RouterProps;

const testOrganization = {
    id: 'mosiac',
    title: 'Mosaic',
    description: 'Assists immigrants, refugees, and newcomers in the course of their settlement and integration into Canadian society. Provides employment services… family services, interpretation and translation, language instruction, legal information, settlement services, and victim and family violence services from multiple sites in Metro Vancouver. Also provides employment services under contract to BC Employment and Assistance (BCEA); see WorkBC listings for details. Office hours are 9 am to 5 pm Monday to Friday. Nonprofit society, registered charity.',
    addresses: ['Head Office\n5575 Boundary Road Vancouver, BC\nV5R 2P9'],
    phone: '604-254-9626',
    website: 'http://mosaicbc.org',
    email: 'email@email.com',
    lastVerified: '2018-07-25',
};

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
                <TitleComponent title={testOrganization.title.toUpperCase()} />
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
                        <AboutTab />
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
                        <ServicesTab />
                    </Tab>
                </Tabs>
            </Content>
        </View>
    );
};

const AboutTab = (): JSX.Element => (
    <Content>
        <MarkdownBodyComponent
            body={testOrganization.description}
            shouldBeExpandable={true}
            //TODO Issue #1080 When organization detail page is online connect the following 2 states to the store/persisted data
            showLinkAlerts={true}
            hideLinkAlerts={console.log} />
        <DividerComponent />
        <AboutContactDetails />
    </Content>
);

const AboutContactDetails = (): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <Text>TODO</Text>
    </View>
);

const ServicesTab = (): JSX.Element => (
    <Text>TODO</Text>
);

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