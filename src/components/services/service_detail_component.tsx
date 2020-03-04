// tslint:disable: no-expression-statement
import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
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
import { FeedbackComponent } from '../feedback/feedback_component';
import { isAndroid } from '../../helpers/is_android';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { ServiceDetailIconComponent } from './service_detail_icon';
import { FeedbackOptionsModalComponent } from '../feedback/feedback_options_modal_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Feedback = {
    readonly nameFeedback: string;
    readonly organizationFeedback: string;
    readonly descriptionFeedback: string;
    readonly addressFeedback: string;
    readonly phoneFeedback: string;
    readonly websiteFeedback: string;
    readonly emailFeedback: string;
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
    const [feedbackEnabled, setFeedbackEnabled]: readonly [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [feedback, setFeedback]: readonly [Feedback, Dispatch<SetStateAction<Feedback>>] =
        useState(getDefaultFeedbackValues());
    const setFeedbackForField = R.curry((field: keyof Feedback, value: string): void => (
        setFeedback({...feedback, [field]: value})
    ));
    const [showFeedbackOptionsModal, setShowFeedbackOptionsModal]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const scrollViewRef = useRef<KeyboardAwareScrollView>(undefined);

    const onFeedbackButtonPress = (): void => {
        setFeedbackEnabled(true);
        setShowFeedbackOptionsModal(false);
        scrollToTop();
    };

    const scrollToTop = (): void => {
        scrollViewRef.current.scrollToPosition(0, 0, false);
    };

    return (
        <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            extraHeight={100}
            extraScrollHeight={isAndroid() ? 100 : 0}
            enableOnAndroid={true}
            ref={scrollViewRef}
        >
            <View padder>
                <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
                <FeedbackComponent
                    onChangeFeedbackText={setFeedbackForField('nameFeedback')}
                    feedbackText={feedback.nameFeedback}
                    fieldLabel={<Trans>Name</Trans>}
                    fieldValue={props.service.name}
                    feedbackEnabled={feedbackEnabled}
                    feedbackDisabledComponent={<Name name={props.service.name} />}
                />
                <DividerComponent />
                <FeedbackComponent
                    onChangeFeedbackText={setFeedbackForField('organizationFeedback')}
                    feedbackText={feedback.organizationFeedback}
                    fieldLabel={<Trans>Organization</Trans>}
                    fieldValue={props.service.organizationName}
                    feedbackEnabled={feedbackEnabled}
                    feedbackDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
                />
                <DividerComponent />
                <FeedbackComponent
                    onChangeFeedbackText={setFeedbackForField('descriptionFeedback')}
                    feedbackText={feedback.descriptionFeedback}
                    fieldLabel={<Trans>Description</Trans>}
                    fieldValue={props.service.description}
                    feedbackEnabled={feedbackEnabled}
                    feedbackDisabledComponent={<Description description={props.service.description} />}
                />
                <DividerComponent />
                <ServiceContactDetails
                    service={props.service}
                    currentPathForAnaltyics={props.location.pathname}
                    feedbackEnabled={feedbackEnabled}
                    setFeedbackForField={setFeedbackForField}
                    feedback={feedback}
                    analyticsLinkPressed={props.analyticsLinkPressed}
                    {...props}
                />
                <FeedbackButton isVisible={!feedbackEnabled} onPress={(): void => setShowFeedbackOptionsModal(true)} />
                <FeedbackOptionsModalComponent
                    isVisible={showFeedbackOptionsModal}
                    setIsVisible={setShowFeedbackOptionsModal}
                    onSuggestAnUpdatePress={onFeedbackButtonPress}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

const getDefaultFeedbackValues = (): Feedback => ({
    nameFeedback: '',
    organizationFeedback: '',
    descriptionFeedback: '',
    addressFeedback: '',
    phoneFeedback: '',
    websiteFeedback: '',
    emailFeedback: '',
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
    readonly feedback: Feedback;
    readonly feedbackEnabled: boolean;
    readonly setFeedbackForField: (field: keyof Feedback) => (value: string) => void;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

const ServiceContactDetails = (props: ServiceContactDetailsProps & RouterProps): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    const currentPathForAnalytics = props.location.pathname;
    const physicalAddresses = filterPhysicalAddresses(props.service.addresses);

    return (
        <>
            <FeedbackComponent
                onChangeFeedbackText={props.setFeedbackForField('addressFeedback')}
                feedbackText={props.feedback.addressFeedback}
                fieldLabel={<Trans>Address</Trans>}
                fieldValue={getAddressesString(physicalAddresses)}
                feedbackEnabled={props.feedbackEnabled}
                feedbackDisabledComponent={
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
            <FeedbackComponent
                onChangeFeedbackText={props.setFeedbackForField('phoneFeedback')}
                feedbackText={props.feedback.phoneFeedback}
                fieldLabel={<Trans>Phone numbers</Trans>}
                fieldValue={getPhonesString(props.service.phoneNumbers)}
                feedbackEnabled={props.feedbackEnabled}
                feedbackDisabledComponent={
                    <PhoneNumbersComponent
                        phoneNumbers={props.service.phoneNumbers}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <FeedbackComponent
                onChangeFeedbackText={props.setFeedbackForField('websiteFeedback')}
                feedbackText={props.feedback.websiteFeedback}
                fieldLabel={<Trans>Website</Trans>}
                fieldValue={props.service.website}
                feedbackEnabled={props.feedbackEnabled}
                feedbackDisabledComponent={
                    <WebsiteComponent
                        website={props.service.website}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <FeedbackComponent
                onChangeFeedbackText={props.setFeedbackForField('emailFeedback')}
                feedbackText={props.feedback.emailFeedback}
                fieldLabel={<Trans>Email</Trans>}
                fieldValue={props.service.email}
                feedbackEnabled={props.feedbackEnabled}
                feedbackDisabledComponent={
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

const FeedbackButton = (props: { readonly isVisible: boolean, readonly onPress: () => void } ): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
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
};