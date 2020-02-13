// tslint:disable: no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity } from 'react-native';
import { Content, View } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DividerComponent } from '../content_layout/divider_component';
import { RouterProps } from '../../application/routing';
import { ContentVerificationComponent } from '../content_verification/content_verification_component';
import { HumanServiceData, Address, PhoneNumber } from '../../validation/services/types';
import { AddressesComponent } from '../addresses/addresses_component';
import { PhoneNumbersComponent } from '../phone_numbers/phone_numbers_component';
import { WebsiteComponent } from '../website/website_component';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from '../services//build_service_name';
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';
import { EmailComponent } from '../email/email_component';
import { SuggestUpdateComponent } from '../suggest_update/suggest_update_component';
import { isAndroid } from '../../helpers/is_android';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { ServiceDetailIconComponent } from './service_detail_icon';
import { FeedbackModalComponent } from '../feedback_modal/feedback_modal_component';

type SuggestedUpdates = {
    readonly nameSuggestion: string;
    readonly organizationSuggestion: string;
    readonly descriptionSuggestion: string;
    readonly addressSuggestion: string;
    readonly phoneSuggestion: string;
    readonly websiteSuggestion: string;
    readonly emailSuggestion: string;
};

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
}

export interface ServiceDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;
type SetShowModal = Dispatch<SetStateAction<boolean>>;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const [suggestingEnabled, setSuggestingEnabled]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [suggestedUpdates, setSuggestedUpdates]: readonly [SuggestedUpdates, Dispatch<SetStateAction<SuggestedUpdates>>] =
        useState(getDefaultSuggestedUpdates());
    const setSuggestedUpdateForField = R.curry((field: keyof SuggestedUpdates, value: string): void => (
        setSuggestedUpdates({...suggestedUpdates, [field]: value})
    ));
    const onSuggestAnUpdatePress = (): void => {
        setSuggestingEnabled(!suggestingEnabled);
        setShowModal(false);
    };
    const [showModal, setShowModal]: readonly[boolean, SetShowModal] = useState(false);

    return (
        <Content
            padder
            enableResetScrollToCoords={false}
            extraHeight={100}
            extraScrollHeight={isAndroid() ? 100 : 0}
            enableOnAndroid={true}
        >
            <BannerImageComponent imageSource={undefined} />
            <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('nameSuggestion')}
                suggestionText={suggestedUpdates.nameSuggestion}
                fieldLabel={<Trans>Name</Trans>}
                fieldValue={props.service.name}
                suggestingEnabled={suggestingEnabled}
                suggestingDisabledComponent={<Name name={props.service.name} />}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('organizationSuggestion')}
                suggestionText={suggestedUpdates.organizationSuggestion}
                fieldLabel={<Trans>Organization</Trans>}
                fieldValue={props.service.organizationName}
                suggestingEnabled={suggestingEnabled}
                suggestingDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('descriptionSuggestion')}
                suggestionText={suggestedUpdates.descriptionSuggestion}
                fieldLabel={<Trans>Description</Trans>}
                fieldValue={props.service.description}
                suggestingEnabled={suggestingEnabled}
                suggestingDisabledComponent={<Description description={props.service.description} />}
            />
            <DividerComponent />
            <ServiceContactDetails
                service={props.service}
                currentPathForAnaltyics={props.location.pathname}
                suggestingEnabled={suggestingEnabled}
                setSuggestedUpdateForField={setSuggestedUpdateForField}
                suggestedUpdates={suggestedUpdates}
                analyticsLinkPressed={props.analyticsLinkPressed}
                {...props}
            />
            <DividerComponent />
            <SuggestAnUpdateButton onPress={(): void => setShowModal(true)} />
            <FeedbackModalComponent isVisible={showModal} setShowModal={setShowModal} onSuggestAnUpdatePress={onSuggestAnUpdatePress}/>
        </Content>
    );
};

const getDefaultSuggestedUpdates = (): SuggestedUpdates => ({
    nameSuggestion: '',
    organizationSuggestion: '',
    descriptionSuggestion: '',
    addressSuggestion: '',
    phoneSuggestion: '',
    websiteSuggestion: '',
    emailSuggestion: '',
});

interface NameProps {
    readonly name: string;
}

const Name = (props: NameProps): JSX.Element => (
    <>
        <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
        <TitleComponent title={props.name} />
    </>
);

interface OrganizationProps {
    readonly history: History;
    readonly name: string;
}

const Organization = (props: OrganizationProps): JSX.Element => (
    <>
        <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
            <Trans>Provided by</Trans>:
        </Text>
        <TouchableOpacity onPress={(): void => undefined}>
            <Text style={textStyles.URL}>{props.name}</Text>
        </TouchableOpacity>
    </>
);

interface DescriptionProps {
    readonly description: string;
}

const Description = (props: DescriptionProps): JSX.Element => (
    <MarkdownBodyComponent body={props.description} shouldBeExpandable={true} />
);

interface ServiceContactDetailsProps {
    readonly service: HumanServiceData;
    readonly currentPathForAnaltyics: string;
    readonly suggestedUpdates: SuggestedUpdates;
    readonly suggestingEnabled: boolean;
    readonly setSuggestedUpdateForField: (field: keyof SuggestedUpdates) => (value: string) => void;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

const ServiceContactDetails = (props: ServiceContactDetailsProps & RouterProps): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    const currentPathForAnalytics = props.location.pathname;
    const physicalAddresses = filterPhysicalAddresses(props.service.addresses);

    return (
        <>
            <SuggestUpdateComponent
                onChangeSuggestionText={props.setSuggestedUpdateForField('addressSuggestion')}
                suggestionText={props.suggestedUpdates.addressSuggestion}
                fieldLabel={<Trans>Address</Trans>}
                fieldValue={getAddressesString(physicalAddresses)}
                suggestingEnabled={props.suggestingEnabled}
                suggestingDisabledComponent={
                    <AddressesComponent
                        addresses={physicalAddresses}
                        latLong={props.service.latlong}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(props.service.addresses))}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={props.setSuggestedUpdateForField('phoneSuggestion')}
                suggestionText={props.suggestedUpdates.phoneSuggestion}
                fieldLabel={<Trans>Phone numbers</Trans>}
                fieldValue={getPhonesString(props.service.phoneNumbers)}
                suggestingEnabled={props.suggestingEnabled}
                suggestingDisabledComponent={
                    <PhoneNumbersComponent
                        phoneNumbers={props.service.phoneNumbers}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={props.setSuggestedUpdateForField('websiteSuggestion')}
                suggestionText={props.suggestedUpdates.websiteSuggestion}
                fieldLabel={<Trans>Website</Trans>}
                fieldValue={props.service.website}
                suggestingEnabled={props.suggestingEnabled}
                suggestingDisabledComponent={
                    <WebsiteComponent
                        website={props.service.website}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={props.setSuggestedUpdateForField('emailSuggestion')}
                suggestionText={props.suggestedUpdates.emailSuggestion}
                fieldLabel={<Trans>Email</Trans>}
                fieldValue={props.service.email}
                suggestingEnabled={props.suggestingEnabled}
                suggestingDisabledComponent={
                    <EmailComponent
                        email={props.service.email}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <ContentVerificationComponent verificationDate={'N/A'} />
        </>
    );
 };

const getAddressesString = (addresses: ReadonlyArray<Address>): string => (
    addresses.map((address: Address) => `${address.address}\n${address.city} ${address.stateProvince} ${address.postalCode}`).join('\n')
);

const getPhonesString = (phones: ReadonlyArray<PhoneNumber>): string => (
    phones.map((phone: PhoneNumber) => `${phone.type}: ${phone.phone_number}`).join('\n')
);

const SuggestAnUpdateButton = (props: { readonly onPress: () => void } ): JSX.Element => (
    <View style={{flexDirection: 'row-reverse', marginBottom: 20}}>
        <TouchableOpacity
            onPress={props.onPress}
            style={{ borderWidth: 1, borderColor: colors.greyBorder, borderRadius: 20 , paddingVertical: 10, paddingHorizontal: 16 }}
        >
            <View style={{ flexDirection: 'row'}}>
                <ServiceDetailIconComponent name={'edit'} />
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    <Trans>Suggest an update</Trans>
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);