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
import { HumanServiceData, Address } from '../../validation/services/types';
import { AddressesComponent } from '../addresses/addresses_component';
import { PhoneNumbersComponent } from '../phone_numbers/phone_numbers_component';
import { WebsiteComponent } from '../website/website_component';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from '../services//build_service_name';
import { openInMapsApplication } from '../maps_application_popup/open_in_maps_application';
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';
import { EmailComponent } from '../email/email_component';
import { SuggestUpdateComponent } from '../suggest_update/suggest_update_component';

type SuggestedUpdates = Partial<{
    readonly nameSuggestion: string;
    readonly organizationSuggestion: string;
    readonly descriptionSuggestion: string;
    readonly addressSuggestion: string;
    readonly phoneSuggestion: string;
    readonly websiteSuggestion: string;
    readonly emailSuggestion: string;
}>;

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
}

type Props = ServiceDetailProps & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const [isSuggestingUpdates, setIsSuggestingUpdates]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [suggestedUpdates, setSuggestedUpdates]: readonly [SuggestedUpdates, Dispatch<SetStateAction<SuggestedUpdates>>] = useState({});
    const setSuggestedUpdateForField = R.curry((field: string, value: string): void => (
        setSuggestedUpdates({...suggestedUpdates, [field]: value})
    ));
    const onSuggestAnUpdatePress = (): void => setIsSuggestingUpdates(!isSuggestingUpdates);

    return (
        <Content padder style={{ flex: 1 }} enableResetScrollToCoords={false} extraHeight={150}>
            <BannerImageComponent imageSource={undefined} />
            {/* TODO: Remove and replace this temporary button */}
            <TemporarySuggestAnUpdateButton onPress={onSuggestAnUpdatePress} />
            <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
            <SuggestUpdateComponent
                isEnabled={isSuggestingUpdates}
                onChangeText={setSuggestedUpdateForField('nameSuggestion')}
                textValue={suggestedUpdates.nameSuggestion || ''}
                label={<Trans>Name</Trans>}
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
                onChangeText={setSuggestedUpdateForField('descriptionSuggestion')}
                textValue={suggestedUpdates.descriptionSuggestion || ''}
                label={<Trans>Description</Trans>}
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
            />
        </Content>
    );
};

interface ServiceOrganizationProps {
    readonly history: History;
    readonly name: string;
    readonly suggestedUpdates: SuggestedUpdates;
    readonly isSuggestingUpdates: boolean;
    readonly setSuggestedUpdateForField: (field: string) => (value: string) => void;
}

const ServiceOrganization = (props: ServiceOrganizationProps): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <DividerComponent />
        <SuggestUpdateComponent
            isEnabled={props.isSuggestingUpdates}
            onChangeText={props.setSuggestedUpdateForField('organizationSuggestion')}
            textValue={props.suggestedUpdates.organizationSuggestion || ''}
            label={<Trans>Organization</Trans>}
        />
        <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
            <Trans>Provided by</Trans>:
        </Text>
        <TouchableOpacity onPress={(): void => undefined}>
            <Text style={textStyles.URL}>{props.name.toUpperCase()}</Text>
        </TouchableOpacity>
        <DividerComponent />
    </View>
);

interface ServiceContactDetailsProps {
    readonly service: HumanServiceData;
    readonly currentPathForAnaltyics: string;
    readonly suggestedUpdates: SuggestedUpdates;
    readonly isSuggestingUpdates: boolean;
    readonly setSuggestedUpdateForField: (field: string) => (value: string) => void;
}

const ServiceContactDetails = (props: ServiceContactDetailsProps): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    const locationTitle = getLocationTitleFromAddresses(filterPhysicalAddresses(props.service.addresses));
    const onPressForAddress = (_: Address): () => Promise<void> => {
        if (serviceHasLatLng(props.service)) {
            return openInMapsApplication(
                locationTitle,
                props.service.latlong.lat,
                props.service.latlong.lng,
                props.currentPathForAnaltyics,
                linkContextForAnalytics,
            );
        }
        return undefined;
    };

    return (
        <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeText={props.setSuggestedUpdateForField('addressSuggestion')}
                textValue={props.suggestedUpdates.addressSuggestion || ''}
                label={<Trans>Addresses</Trans>}
            />
            <AddressesComponent
                addresses={filterPhysicalAddresses(props.service.addresses)}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
                onPressForAddress={onPressForAddress}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeText={props.setSuggestedUpdateForField('phoneSuggestion')}
                textValue={props.suggestedUpdates.phoneSuggestion || ''}
                label={<Trans>Phone numbers</Trans>}
            />
            <PhoneNumbersComponent
                phoneNumbers={props.service.phoneNumbers}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeText={props.setSuggestedUpdateForField('websiteSuggestion')}
                textValue={props.suggestedUpdates.websiteSuggestion || ''}
                label={<Trans>Website</Trans>}
            />
            <WebsiteComponent
                website={props.service.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
            />
            <DividerComponent />
            <SuggestUpdateComponent
                isEnabled={props.isSuggestingUpdates}
                onChangeText={props.setSuggestedUpdateForField('emailSuggestion')}
                textValue={props.suggestedUpdates.emailSuggestion || ''}
                label={<Trans>Email</Trans>}
            />
            <EmailComponent
                email={props.service.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={props.currentPathForAnaltyics}
            />
            <DividerComponent />
            <ContentVerificationComponent verificationDate={'N/A'} />
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

const serviceHasLatLng = (service: HumanServiceData): number => (
    service.latlong && service.latlong.lat && service.latlong.lng
);
