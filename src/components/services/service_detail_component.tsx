import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Content, Icon } from 'native-base';
import { values, textStyles, colors } from '../../application/styles';
import { mapWithIndex } from '../../application/map_with_index';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { BodyComponent } from '../content_layout/body_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DividerComponent } from '../content_layout/divider_component';
import { CardButtonComponent } from '../card_button/card_button_component';
import { RouterProps } from '../../application/routing';
import { ContentVerificationComponent } from '../content_verification/content_verification_component';
import { openURL } from '../link/link';
import { HumanServiceData, Address, PhoneNumber } from '../../validation/services/types';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from './build_service_name';

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
            <ServiceContactDetails service={props.service} currentPath={props.location.pathname}/>
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

const ServiceContactDetails = (props: { readonly service: HumanServiceData, readonly currentPath: string }): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <AddressesComponent addresses={filterPhysicalAddresses(props.service.addresses)} />
        <PhoneNumbersComponent service={props.service} currentPath={props.currentPath} />
        <WebsiteComponent website={props.service.website}/>
        <ContentVerificationComponent verificationDate={testService.lastVerified} />
        <DividerComponent />
    </View>
);

const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));

const IconComponent = (props: { readonly icon?: string }): JSX.Element => (
    <Icon name={props.icon} type={'FontAwesome'} style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}/>
);

const AddressesComponent = (props: { readonly addresses: ReadonlyArray<Address>}): JSX.Element => (
    <View>
        {mapWithIndex((address: Address, index: number) =>
            <View key={index}>
                <CardButtonComponent
                    leftContent={<SingleAddressComponent address={address} />}
                    rightContent={<IconComponent icon={'location-arrow'}/>}
                    onPress={(): void => undefined} />
                <DividerComponent />
            </View>
        , props.addresses)}
    </View>
);

const SingleAddressComponent = (props: {readonly address: Address}): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address</Trans>: </Text>
        <Text style={textStyles.paragraphStyle}>{props.address.address}</Text>
        <Text style={textStyles.paragraphStyle}>
            {props.address.city} {props.address.stateProvince} {props.address.postalCode ? props.address.postalCode : ''}
        </Text>
    </View>
);

const PhoneNumbersComponent = (props: {readonly service: HumanServiceData, readonly currentPath: string}): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const analyticsLinkContext = buildAnalyticsLinkContext('Service', serviceName);
    return (
        <View>
            {mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element =>
                <View key={index}>
                    <CardButtonComponent
                        leftContent={
                            <SinglePhoneNumberComponent
                                phoneNumber={phoneNumber}
                                currentPath={props.currentPath}
                                analyticsLinkContext={analyticsLinkContext}
                            />
                        }
                        rightContent={<IconComponent icon='phone' />}
                        onPress={(): void => openURL('tel: ' + phoneNumber.phoneNumber)}
                    />
                    <DividerComponent />
                </View>
            , props.service.phoneNumbers)}
        </View>
    );
};

interface SinglePhoneNumberProps {
    readonly phoneNumber: PhoneNumber;
    readonly currentPath: string;
    readonly analyticsLinkContext: string;
}

const SinglePhoneNumberComponent = (props: SinglePhoneNumberProps): JSX.Element => {
    const capitalizeFirstLetter = (s: string): string => (
        s.charAt(0).toUpperCase() + s.slice(1)
    );
    const fieldLabel = capitalizeFirstLetter(props.phoneNumber.type);
    return (
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}>{fieldLabel}: </Text>
            <Text style={textStyles.paragraphStyle}>{props.phoneNumber.phoneNumber}</Text>
        </View>
    );
};

const WebsiteComponent = (props: {readonly website: string}): JSX.Element => (
    <View>
        <CardButtonComponent
            leftContent={(
                <View>
                    <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Website</Trans>: </Text>
                    <Text style={textStyles.paragraphStyle}>{props.website}</Text>
                </View>)
            }
            rightContent={<IconComponent icon='external-link' />}
            onPress={(): void => openURL(testService.website)}
        />
        <DividerComponent />
    </View>
);
