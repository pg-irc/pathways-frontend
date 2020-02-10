import React, { useState, Dispatch, SetStateAction } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { values, textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
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
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';
import { EmailComponent } from '../email/email_component';
import { SuggestUpdateComponent } from '../suggest_update/suggest_update_component';
import { isAndroid } from '../../helpers/is_android';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';

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
            extraHeight={isAndroid() ? 200 : 100}
            enableOnAndroid={true}
        >
            <BannerImageComponent imageSource={undefined} />
            {/* TODO: Remove and replace this temporary button */}
            <TemporarySuggestAnUpdateButton onPress={onSuggestAnUpdatePress} />
            <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
            <SuggestUpdateComponent
                isEnabled={isSuggestingUpdates}
                onChangeSuggestionText={setSuggestedUpdateForField('nameSuggestion')}
                suggestionText={suggestedUpdates.nameSuggestion}
                fieldLabel={<Trans>Name</Trans>}
                style={{ paddingHorizontal: values.backgroundTextPadding }}
            />
            <TitleComponent title={props.service.name} />
            <ServiceOrganization
                history={props.history}
                name={props.service.organizationName}
                isSuggestingUpdates={isSuggestingUpdates}
                setSuggestedUpdateForField={setSuggestedUpdateForField}
                suggestedUpdates={suggestedUpdates}
            />
            <SuggestUpdateComponent
                isEnabled={isSuggestingUpdates}
                onChangeSuggestionText={setSuggestedUpdateForField('descriptionSuggestion')}
                suggestionText={suggestedUpdates.descriptionSuggestion}
                fieldLabel={<Trans>Description</Trans>}
                style={{ paddingHorizontal: values.backgroundTextPadding }}
            />
            <MarkdownBodyComponent body={props.service.description} shouldBeExpandable={true} />
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

interface ServiceOrganizationProps {
    readonly history: History;
    readonly name: string;
    readonly suggestedUpdates: SuggestedUpdates;
    readonly isSuggestingUpdates: boolean;
    readonly setSuggestedUpdateForField: (field: keyof SuggestedUpdates) => (value: string) => void;
}

const ServiceOrganization = (props: ServiceOrganizationProps): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <DividerComponent />
        <SuggestUpdateComponent
            isEnabled={props.isSuggestingUpdates}
            onChangeSuggestionText={props.setSuggestedUpdateForField('organizationSuggestion')}
            suggestionText={props.suggestedUpdates.organizationSuggestion}
            fieldLabel={<Trans>Organization</Trans>}
        />
        <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
            <Trans>Provided by</Trans>:
        </Text>
        <TouchableOpacity onPress={(): void => undefined}>
        <Text style={textStyles.URL}>{props.name}</Text>
        </TouchableOpacity>
        <DividerComponent />
    </View>
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

    return (
        <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeSuggestionText={props.setSuggestedUpdateForField('addressSuggestion')}
                suggestionText={props.suggestedUpdates.addressSuggestion}
                fieldLabel={<Trans>Addresses</Trans>}
            />
            <AddressesComponent
                addresses={filterPhysicalAddresses(props.service.addresses)}
                latLong={props.service.latlong}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(props.service.addresses))}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeSuggestionText={props.setSuggestedUpdateForField('phoneSuggestion')}
                suggestionText={props.suggestedUpdates.phoneSuggestion}
                fieldLabel={<Trans>Phone numbers</Trans>}
            />
            <PhoneNumbersComponent
                phoneNumbers={props.service.phoneNumbers}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeSuggestionText={props.setSuggestedUpdateForField('websiteSuggestion')}
                suggestionText={props.suggestedUpdates.websiteSuggestion}
                fieldLabel={<Trans>Website</Trans>}
            />
            <WebsiteComponent
                website={props.service.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeSuggestionText={props.setSuggestedUpdateForField('emailSuggestion')}
                suggestionText={props.suggestedUpdates.emailSuggestion}
                fieldLabel={<Trans>Email</Trans>}
            />
            <EmailComponent
                email={props.service.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <ContentVerificationComponent verificationDate={'N/A'} />
            <DividerComponent />
        </View>
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