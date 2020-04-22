// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState, useRef, useEffect, MutableRefObject } from 'react';
import * as R from 'ramda';
// import { t } from '@lingui/macro';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { values, textStyles, colors } from '../../application/styles';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { RouterProps, getParametersFromPath, Routes, goToRouteWithParameter } from '../../application/routing';
import { ContentVerificationComponent } from '../content_verification_component';
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
import { useSendFeedback, SendFeedbackPromise } from './use_send_feedback';
import { ServiceFeedback, FeedbackField, Feedback, FeedbackScreen, FeedbackModal, UserInformation } from '../../stores/feedback/types';
import { FeedbackPostData } from '../../selectors/feedback/types';
import {
    SubmitAction,
    FinishAction,
    SuggestAnUpdateAction,
    ChooseChangeNameOrDetailsAction,
    ChooseRemoveServiceAction,
    ChooseOtherChangesAction,
    CloseAction,
    DiscardChangesAction,
} from '../../stores/feedback';
// import { showToast } from '../../application/toast';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly feedbackPostData: FeedbackPostData;
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
}

export interface ServiceDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly suggestAnUpdate: () => SuggestAnUpdateAction;
    readonly chooseChangeNameOrDetail: () => ChooseChangeNameOrDetailsAction;
    readonly chooseRemoveService: () => ChooseRemoveServiceAction;
    readonly chooseOtherChanges: () => ChooseOtherChangesAction;
    readonly submitFeedback: (feedback: Feedback) => SubmitAction;
    readonly finishFeedback: (userInformation: UserInformation) => FinishAction;
    readonly close: () => CloseAction;
    readonly discardFeedback: () => DiscardChangesAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const isEditableService = props.feedbackScreen === FeedbackScreen.EditableServiceDetailPage;
    const scrollViewRef = useRef<KeyboardAwareScrollView>(undefined);
    const [feedback, setFeedback]: readonly[ServiceFeedback, Dispatch<SetStateAction<ServiceFeedback>>] = useState(getEmptyServiceFeedback());
    const [userInformation, setUserInformation]: readonly[UserInformation, Dispatch<SetStateAction<UserInformation>>] = useState(getEmptyUserInfo());
    const [feedbackIsReadyToSend, setFeedbackIsReadyToSend]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [isSendingFeedback, sendFeedback]: SendFeedbackPromise = useSendFeedback(props.feedbackPostData, onSendFeedbackFinished);
    useEffect(sendFeedbackWhenReady, [feedbackIsReadyToSend]);
    useEffect(navigateOnScreenChange, [props.feedbackScreen]);

    function onSendFeedbackFinished(): void {
        resetLocalFeedbackState();
        props.discardFeedback();
        // TODO upgrade i18n: https://lingui.js.org/releases/migration-3.html
        // showToast(i18n._(t`Thank you for your contribution!`));
        // TODO Clear store feedback?
        // Double check "discard" action works as expected and review mocks for discard confirmation modal
    }

    function navigateOnScreenChange(): void {
        switch (props.feedbackScreen) {
            case FeedbackScreen.OtherChangesPage:
            case FeedbackScreen.RemoveServicePage:
                return goToRouteWithParameter(Routes.Feedback, props.match.params.serviceId, props.history)();
            case FeedbackScreen.EditableServiceDetailPage:
                return scrollToTop(scrollViewRef);
            default:
                return undefined;
        }
    }

    function sendFeedbackWhenReady(): void {
        if (feedbackIsReadyToSend) {
            sendFeedback();
        }
    }

    const setFeedbackForField = R.curry((fieldName: keyof ServiceFeedback, fieldValue: FeedbackField): void => (
        setFeedback({...feedback, [fieldName]: fieldValue })
    ));

    const onSuggestAnUpdatePress = (): void => {
        props.suggestAnUpdate();
    };

    const onChangeNameOrDetailsPress = (): void => {
        props.chooseChangeNameOrDetail();
    };

    const onRemoveThisServicePress = (): void => {
        props.chooseRemoveService();
    };

    const onOtherChangesPress = (): void => {
        props.chooseOtherChanges();
    };

    const closeModal = (): void => {
        // TODO see if you can make this not flicker.
        props.close();
    };

    // TODO Wire this up to the submit button for service feedback.
    // const onSubmitPress = (): void => {
    //     props.submitFeedback(feedback);
    // };

    const onFinishPress = (): void => {
        props.finishFeedback(userInformation);
        setFeedbackIsReadyToSend(true);
    };

    const resetLocalFeedbackState = (): void => {
        setFeedback(getEmptyServiceFeedback());
        setUserInformation(getEmptyUserInfo());
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
                        setFeedbackField={setFeedbackForField('name')}
                        feedbackField={feedback.name}
                        fieldLabel={<Trans>Name</Trans>}
                        fieldValue={props.service.name}
                        feedbackEnabled={isEditableService}
                        feedbackDisabledComponent={<Name name={props.service.name} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        setFeedbackField={setFeedbackForField('organization')}
                        feedbackField={feedback.organization}
                        fieldLabel={<Trans>Organization</Trans>}
                        fieldValue={props.service.organizationName}
                        feedbackEnabled={isEditableService}
                        feedbackDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        setFeedbackField={setFeedbackForField('description')}
                        feedbackField={feedback.description}
                        fieldLabel={<Trans>Description</Trans>}
                        fieldValue={props.service.description}
                        feedbackEnabled={isEditableService}
                        feedbackDisabledComponent={<Description description={props.service.description} />}
                    />
                    <DividerComponent />
                    <ServiceContactDetails
                        service={props.service}
                        currentPathForAnaltyics={props.location.pathname}
                        isEditableService={isEditableService}
                        setFeedbackForField={setFeedbackForField}
                        feedback={feedback}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                        {...props}
                    />
                    <DividerComponent />
                    <FeedbackModalContainer
                        isSendingFeedback={isSendingFeedback}
                        showSuggestAnUpdate={props.feedbackScreen !== FeedbackScreen.EditableServiceDetailPage}
                        showChoooseFeedbackModeModal={props.feedbackModal === FeedbackModal.ChooseFeedbackModeModal}
                        showReceiveUpdatesModal={props.feedbackModal === FeedbackModal.ReceiveUpdatesModal}
                        userInformation={userInformation}
                        setUserInformation={setUserInformation}
                        onSuggestAnUpdatePress={onSuggestAnUpdatePress}
                        onChangeNameOrDetailsPress={onChangeNameOrDetailsPress}
                        onRemoveThisServicePress={onRemoveThisServicePress}
                        onOtherChangesPress={onOtherChangesPress}
                        onFinishPress={onFinishPress}
                        closeModal={closeModal}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const getEmptyServiceFeedback = (shouldSend: boolean = true): ServiceFeedback => {
    const emptyFeedbackField = { value: '', shouldSend };
    return {
        type: 'service_feedback',
        name: emptyFeedbackField,
        organization: emptyFeedbackField,
        description: emptyFeedbackField,
        address: emptyFeedbackField,
        phone: emptyFeedbackField,
        website: emptyFeedbackField,
        email: emptyFeedbackField,
    };
};

const getEmptyUserInfo = (): UserInformation => ({
    email: '',
    name: '',
    organizationName: '',
    jobTitle: '',
    isEmployee: undefined,
});

const scrollToTop = (scrollViewRef: MutableRefObject<KeyboardAwareScrollView>): void => {
    scrollViewRef.current.scrollToPosition(0, 0, false);
};

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
    readonly feedback: ServiceFeedback;
    readonly isEditableService: boolean;
    readonly setFeedbackForField: (fieldName: keyof ServiceFeedback) => (field: FeedbackField) => void;
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
                setFeedbackField={props.setFeedbackForField('address')}
                feedbackField={props.feedback.address}
                fieldLabel={<Trans>Address</Trans>}
                fieldValue={getAddressesString(physicalAddresses)}
                feedbackEnabled={props.isEditableService}
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
                setFeedbackField={props.setFeedbackForField('phone')}
                feedbackField={props.feedback.phone}
                fieldLabel={<Trans>Phone numbers</Trans>}
                fieldValue={getPhonesString(props.service.phoneNumbers)}
                feedbackEnabled={props.isEditableService}
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
                setFeedbackField={props.setFeedbackForField('website')}
                feedbackField={props.feedback.website}
                fieldLabel={<Trans>Website</Trans>}
                fieldValue={props.service.website}
                feedbackEnabled={props.isEditableService}
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
                setFeedbackField={props.setFeedbackForField('email')}
                feedbackField={props.feedback.email}
                fieldLabel={<Trans>Email</Trans>}
                fieldValue={props.service.email}
                feedbackEnabled={props.isEditableService}
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
