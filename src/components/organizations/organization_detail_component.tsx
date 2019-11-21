import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View } from 'react-native';
import { Tab, Tabs, TabHeading, Content } from 'native-base';
import { textStyles, colors, values } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { BodyComponent } from '../content_layout/body_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DividerComponent } from '../content_layout/divider_component';

const testOrganization = {
    id: 'mosiac',
    title: 'Mosaic',
    description: 'Assists immigrants, refugees, and newcomers in the course of their settlement and integration into Canadian society. Provides employment services… family services, interpretation and translation, language instruction, legal information, settlement services, and victim and family violence services from multiple sites in Metro Vancouver. Also provides employment services under contract to BC Employment and Assistance (BCEA); see WorkBC listings for details. Office hours are 9 am to 5 pm Monday to Friday. Nonprofit society, registered charity.',
    address: 'Head Office\n5575 Boundary Road Vancouver, BC\nV5R 2P9',
    phone: '604-254-9626',
    fax: '604-254-3932',
    website: 'http://mosaicbc.org',
    email: 'email@email.com',
    lastVerified: '2018-07-25',
};

export const OrganizationDetailComponent = (): JSX.Element => {
    // NativeBase's (Buggy) Tabs component notes:
    //
    // - Breaking out the Tab and TabHeading components from the Tabs component does not seem to work (they don't render)
    // - The activeTextStyle prop only works with a text heading, we need to use a component for translation purposes,
    //   see: https://stackoverflow.com/questions/43113859/customise-tabs-of-native-base, this means we cannot sensibly style active tab text
    return (
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
    );
};

const AboutTab = (): JSX.Element => (
    <Content padder>
        <BannerImageComponent imageSource={undefined} />
        <DescriptorComponent descriptor={<Trans>ORGANIZATION</Trans>}/>
        <TitleComponent title={testOrganization.title.toUpperCase()}/>
        <BodyComponent body={testOrganization.description} shouldBeExpandable={true} />
        <DividerComponent />
        <AboutContactDetails />
    </Content>
);

const AboutContactDetails = (): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
    </View>
);

const ServicesTab = (): JSX.Element => (
    <Text>TODO</Text>
);