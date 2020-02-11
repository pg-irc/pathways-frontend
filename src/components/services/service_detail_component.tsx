import React, { useState, Dispatch, SetStateAction } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
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
import { SuggestingEnabledComponent } from '../suggest_update/suggesting_enabled_component';

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

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const [isSuggestingUpdates, setIsSuggestingUpdates]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [suggestedUpdates, setSuggestedUpdates]: readonly [SuggestedUpdates, Dispatch<SetStateAction<SuggestedUpdates>>] =
        useState(getDefaultSuggestedUpdates());
    const setSuggestedUpdateForField = R.curry((field: keyof SuggestedUpdates, value: string): void => (
        setSuggestedUpdates({...suggestedUpdates, [field]: value})
    ));
    const onSuggestAnUpdatePress = (): void => setIsSuggestingUpdates(!isSuggestingUpdates);

    return (
        <Content
            padder
            enableResetScrollToCoords={false}
            extraHeight={100}
            extraScrollHeight={isAndroid() ? 100 : 0}
            enableOnAndroid={true}
        >
            <BannerImageComponent imageSource={undefined} />
            {/* TODO: Remove and replace this temporary button */}
            <TemporarySuggestAnUpdateButton onPress={onSuggestAnUpdatePress} />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('nameSuggestion')}
                suggestionText={suggestedUpdates.nameSuggestion}
                fieldLabel={<Trans>Name</Trans>}
                suggestingEnabled={isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={props.service.name} />}
                suggestingDisabledComponent={<Name name={props.service.name} />}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('organizationSuggestion')}
                suggestionText={suggestedUpdates.organizationSuggestion}
                fieldLabel={<Trans>Organization</Trans>}
                suggestingEnabled={isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={props.service.organizationName} />}
                suggestingDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                onChangeSuggestionText={setSuggestedUpdateForField('descriptionSuggestion')}
                suggestionText={suggestedUpdates.descriptionSuggestion}
                fieldLabel={<Trans>Description</Trans>}
                suggestingEnabled={isSuggestingUpdates}
                suggestingEnabledComponent={<Description description={props.service.description} />}
                suggestingDisabledComponent={<Description description={props.service.description} />}
            />
            <DividerComponent />
            <ServiceContactDetails
                service={props.service}
                currentPathForAnaltyics={props.location.pathname}
                isSuggestingUpdates={isSuggestingUpdates}
                setSuggestedUpdateForField={setSuggestedUpdateForField}
                suggestedUpdates={suggestedUpdates}
                analyticsLinkPressed={props.analyticsLinkPressed}
                {...props}
            />
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
    readonly isSuggestingUpdates: boolean;
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
                suggestingEnabled={props.isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={getAddressesString(physicalAddresses)} />}
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
                suggestingEnabled={props.isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={getPhonesString(props.service.phoneNumbers)} />}
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
                suggestingEnabled={props.isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={props.service.website} />}
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
                suggestingEnabled={props.isSuggestingUpdates}
                suggestingEnabledComponent={<SuggestingEnabledComponent value={props.service.email} />}
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

const TemporarySuggestAnUpdateButton = (props: { readonly onPress: () => void } ): JSX.Element => (
    <TouchableOpacity
        onPress={props.onPress}
        style={{ borderWidth: 5, borderColor: colors.darkGreyWithAlpha, padding: 10 }}
    >
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
            Suggest an update
        </Text>
    </TouchableOpacity>
);

const getAddressesString = (addresses: ReadonlyArray<Address>): string => (
    addresses.map((address: Address) => `${address.address}\n${address.city} ${address.stateProvince} ${address.postalCode}`).join('\n')
);

const getPhonesString = (phones: ReadonlyArray<PhoneNumber>): string => (
    phones.map((phone: PhoneNumber) => `${phone.type}: ${phone.phone_number}`).join('\n')
);