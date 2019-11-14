import React from 'react';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { values, textStyles } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { BodyComponent } from '../content_layout/body_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DividerComponent } from '../content_layout/divider_component';
import { IconRowComponent } from '../icon_row/icon_row_component';
import { goToRouteWithParameter, Routes } from '../../application/routing';

const testService = {
    organizationId: 'mosaic',
    title: 'Building Blocks Vancouver',
    description: 'Offers home visits in Toronto to support first-time parents with first-born children from birth up to five years of age. Services by team of nurses, social workers, and… other staff include monitoring baby health and development, and providing information about child developmental stages, feeding, toilet training, play and interaction, child discipline, and preparation for preschool and Kindergarten. Service offered in Cantonese, English, Hindi, Korean, Mandarin, Punjabi, Spanish, Tagalog, Tamil, Urdu, and Vietnamese. No interpretation service for other languages available. Funded by the Ministry of Children and Family Development. Partnership with Vancouver Coastal Health.',
    address: '5575 Boundary Road Vancouver, BC\nV5R 2P9',
    phone: '604-254-9626',
    fax: '604-254-3932',
    website: 'http://mosaicbc.org',
    lastVerified: '2018-07-25',
};

interface Props {
    readonly history: History;
}

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    return (
        <Content padder style={{ flex: 1 }}>
            <BannerImageComponent imageSource={undefined} />
            <DescriptorComponent descriptor={<Trans>SERVICE</Trans>}/>
            <TitleComponent title={testService.title}/>
            <ServiceOrganization history={props.history}/>
            <BodyComponent body={testService.description} shouldBeExpandable={true} />
            <DividerComponent />
            <ServiceContactDetails />
        </Content>
    );
};

const ServiceOrganization = (props: { readonly history: History }): JSX.Element => {
    const OrganizationLinkComponent = (): JSX.Element => (
        <TouchableOpacity onPress={goToRouteWithParameter(Routes.OrganizationDetail, testService.organizationId, props.history)}>
            <Text style={textStyles.paragraphURL}>{testService.organizationId.toUpperCase()}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
            <DividerComponent />
            <View style={{ flexDirection: 'row' }}>
                <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
                    <Trans>Provided by</Trans>:
                </Text>
                <OrganizationLinkComponent />
            </View>
            <DividerComponent />
        </View>
    );
};

const ServiceContactDetails = (): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <IconRowComponent
            icon={'location-arrow'}
            textLabel={<Trans>Address</Trans>}
            text={testService.address}
        />
        <DividerComponent />
        <IconRowComponent
            icon={'phone'}
            textLabel={<Trans>Phone</Trans>}
            text={testService.phone}
        />
        <DividerComponent />
        <IconRowComponent
            icon={'fax'}
            textLabel={<Trans>Fax</Trans>}
            text={testService.fax}
        />
        <DividerComponent />
        <IconRowComponent
            icon={'external-link'}
            textLabel={<Trans>Website</Trans>}
            text={testService.website}
        />
        <DividerComponent />
        <IconRowComponent
            icon={'question'}
            textLabel={<Trans>Last verified</Trans>}
            text={testService.lastVerified}
        />
        <DividerComponent />
    </View>
);
