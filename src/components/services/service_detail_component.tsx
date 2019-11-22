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
import { RouterProps } from '../../application/routing';
import { ContentVerificationComponent } from '../content_verification/content_verification_component';
import { HumanServiceData } from '../../validation/services/types';
import { AddressesComponent } from '../addresses/addresses_component';
import { PhoneNumbersComponent } from '../phone_numbers/phone_numbers_component';
import { WebsiteComponent } from '../website/website_component';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from '../services//build_service_name';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
}

type Props = ServiceDetailProps & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    return (
        <Content padder style={{ flex: 1 }}>
            <BannerImageComponent imageSource={undefined} />
            <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
            <TitleComponent title={props.service.name} />
            <ServiceOrganization history={props.history} name={props.service.organizationName} />
            <BodyComponent body={props.service.description} shouldBeExpandable={true} />
            <DividerComponent />
            <ServiceContactDetails service={props.service} currentPathForAnaltyics={props.location.pathname}/>
        </Content>
    );
};

const ServiceOrganization = (props: { readonly history: History, readonly name: string }): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <DividerComponent />
        <View>
            <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
                <Trans>Provided by</Trans>:
            </Text>
            <TouchableOpacity onPress={(): void => undefined}>
                <Text style={textStyles.URL}>{props.name.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
        <DividerComponent />
    </View>
);

const ServiceContactDetails = (props: { readonly service: HumanServiceData, readonly currentPathForAnaltyics: string }): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    return (
        <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
            <AddressesComponent addresses={filterPhysicalAddresses(props.service.addresses)} />
            <PhoneNumbersComponent
                phoneNumbers={props.service.phoneNumbers}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
            />
            <WebsiteComponent
                website={props.service.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
            />
            <ContentVerificationComponent verificationDate={'TODO'} />
            <DividerComponent />
        </View>
    );
 };
