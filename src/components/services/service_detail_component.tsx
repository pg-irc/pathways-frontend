// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { values, textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { RouterProps, getParametersFromPath, Routes } from '../../application/routing';
import { HumanServiceData, Address, PhoneNumber } from '../../validation/services/types';
import { ContentVerificationComponent } from '../content_verification_component';
import { AddressesComponent } from '../addresses/addresses_component';
import { PhoneNumbersComponent } from '../phone_numbers/phone_numbers_component';
import { WebsiteComponent } from '../website/website_component';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from '../services//build_service_name';
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';
import { EmailComponent } from '../email/email_component';
import { FeedbackComponent } from '../feedback/feedback_component';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { FeedbackModalContainer } from '../feedback/feedback_modal_container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackButtonComponent } from '../header_button/back_button_component';
import { BookmarkButtonComponent } from '../bookmark_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { renderHeader } from '../main/render_header';
import { Id } from '../../stores/services';
import { Feedback,  getEmptyFeedback } from '../feedback/hooks/use_send_feedback';
import { useQuery } from '../../hooks/use_query';
import { isAndroid } from '../../application/helpers/is_android';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface ServiceDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const query = useQuery();
    const [feedback, setFeedback]: readonly[Feedback, Dispatch<SetStateAction<Feedback>>]
        = useState<Feedback>(getDefaultFeedback(query.feedback));
    const [feedbackEnabled, setFeedbackEnabled]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(false);

    const scrollViewRef = useRef<KeyboardAwareScrollView>(undefined);

    const setFeedbackForField = R.curry((field: keyof Feedback, value: string): void => (
        setFeedback({...feedback, [field]: value})
    ));

    const scrollToTop = (): void => {
        scrollViewRef.current.scrollToPosition(0, 0, false);
    };

    const onFeedbackButtonPress = (): void => {
        setFeedbackEnabled(true);
        scrollToTop();
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent {...props} />
            <KeyboardAwareScrollView
                enableResetScrollToCoords={false}
                extraHeight={100}
                extraScrollHeight={isAndroid() ? 100 : 0}
                enableOnAndroid={true}
                ref={scrollViewRef}
            >
                <View padder>
                    <FeedbackComponent
                        onChangeFeedbackText={setFeedbackForField('name')}
                        feedbackText={feedback.name.value}
                        fieldLabel={<Trans>Name</Trans>}
                        fieldValue={props.service.name}
                        feedbackEnabled={feedbackEnabled}
                        feedbackDisabledComponent={<Name name={props.service.name} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        onChangeFeedbackText={setFeedbackForField('organization')}
                        feedbackText={feedback.organization.value}
                        fieldLabel={<Trans>Organization</Trans>}
                        fieldValue={props.service.organizationName}
                        feedbackEnabled={feedbackEnabled}
                        feedbackDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        onChangeFeedbackText={setFeedbackForField('description')}
                        feedbackText={feedback.description.value}
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
                    <DividerComponent />
                    <FeedbackModalContainer
                        feedbackEnabled={feedbackEnabled}
                        onSuggestAnUpdatePress={onFeedbackButtonPress}
                        serviceId={props.service.id}
                        query={query}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const getDefaultFeedback = (feedbackFromQuery: Feedback | undefined): Feedback => ({
    ...getEmptyFeedback(), ...feedbackFromQuery,
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

const Organization = (props: { readonly history: History, readonly name: string }): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Provided by</Trans>: </Text>
            <Text style={textStyles.paragraphStyle}>{props.name}</Text>
        </View>
    </View>
);

const HeaderComponent = (props: Props): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.ServiceDetail);
    const serviceId = params.serviceId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(serviceId, props.bookmarkedServicesIds)}
            bookmark={(): BookmarkServiceAction => props.bookmarkService(props.service)}
            unbookmark={(): UnbookmarkServiceAction => props.unbookmarkService(props.service)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={colors.black}
        />,
    ];
    return renderHeader({ backgroundColor, leftButton, rightButtons });
};

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
                onChangeFeedbackText={props.setFeedbackForField('address')}
                feedbackText={props.feedback.address.value}
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
                onChangeFeedbackText={props.setFeedbackForField('phone')}
                feedbackText={props.feedback.phone.value}
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
                onChangeFeedbackText={props.setFeedbackForField('website')}
                feedbackText={props.feedback.website.value}
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
                onChangeFeedbackText={props.setFeedbackForField('email')}
                feedbackText={props.feedback.email.value}
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
    addresses.map((address: Address): string => `${address.address}\n${address.city} ${address.stateProvince} ${address.postalCode}`).join('\n')
);

const getPhonesString = (phones: ReadonlyArray<PhoneNumber>): string => (
    phones.map((phone: PhoneNumber): string => `${phone.type}: ${phone.phone_number}`).join('\n')
);
