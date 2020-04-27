// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState, useRef, useEffect, MutableRefObject } from 'react';
import { TouchableOpacity } from 'react-native';
import * as R from 'ramda';
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
import { ServiceFeedback, FeedbackField, Feedback, FeedbackScreen, FeedbackModal, UserInformation } from '../../stores/feedback/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { ServiceDetailIconComponent } from './service_detail_icon';
import {
    SubmitAction,
    FinishAction,
    SuggestAnUpdateAction,
    ChooseChangeNameOrDetailsAction,
    ChooseRemoveServiceAction,
    ChooseOtherChangesAction,
    CloseAction,
    DiscardChangesAction,
    getEmptyServiceFeedback,
    getEmptyUserInfo,
    BackAction,
    CancelDiscardChangesAction,
    SendFeedbackAction,
} from '../../stores/feedback';
import { isAndroid } from '../../application/helpers/is_android';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
    readonly isSendingFeedback: boolean;
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
    readonly back: () => BackAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly sendFeedback: (serviceId: string) => SendFeedbackAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const serviceId = props.match.params.serviceId;
    const isEditableService = props.feedbackScreen === FeedbackScreen.EditableServiceDetailPage;
    const scrollViewRef = useRef<KeyboardAwareScrollView>(undefined);
    const [feedback, setFeedback]: readonly[ServiceFeedback, Dispatch<SetStateAction<ServiceFeedback>>] = useState(getEmptyServiceFeedback());
    const [userInformation, setUserInformation]: readonly[UserInformation, Dispatch<SetStateAction<UserInformation>>] = useState(getEmptyUserInfo());

    useEffect((): void => {
        switch (props.feedbackScreen) {
            case FeedbackScreen.OtherChangesPage:
            case FeedbackScreen.RemoveServicePage:
                return goToRouteWithParameter(Routes.Feedback, props.match.params.serviceId, props.history)();
            case FeedbackScreen.EditableServiceDetailPage:
                return scrollToTop(scrollViewRef);
            default:
                return undefined;
        }
    }, [props.feedbackScreen]);

    const setFeedbackForField = R.curry((fieldName: keyof ServiceFeedback, fieldValue: FeedbackField): void => (
        setFeedback({...feedback, [fieldName]: fieldValue })
    ));

    const finishAndSendFeedback = (): void => {
        props.finishFeedback(userInformation);
        props.sendFeedback(serviceId);
    };

    // TODO fix after we decided exacly how we're clearing feeedback....
    const resetFeedback = (): void => {
        setFeedback(getEmptyServiceFeedback());
        setUserInformation(getEmptyUserInfo());
        props.discardFeedback();
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
                        isEditableService={isEditableService}
                        feedbackDisabledComponent={<Name name={props.service.name} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        setFeedbackField={setFeedbackForField('organization')}
                        feedbackField={feedback.organization}
                        fieldLabel={<Trans>Organization</Trans>}
                        fieldValue={props.service.organizationName}
                        isEditableService={isEditableService}
                        feedbackDisabledComponent={<Organization name={props.service.organizationName} history={props.history} />}
                    />
                    <DividerComponent />
                    <FeedbackComponent
                        setFeedbackField={setFeedbackForField('description')}
                        feedbackField={feedback.description}
                        fieldLabel={<Trans>Description</Trans>}
                        fieldValue={props.service.description}
                        isEditableService={isEditableService}
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
                        currentPathForAnalytics={props.location.pathname}
                    />
                    <DividerComponent />
                    <SuggestAnUpdateButton
                        isVisible={props.feedbackScreen !== FeedbackScreen.EditableServiceDetailPage}
                        suggestAnUpdate={props.suggestAnUpdate}
                    />
                    <FeedbackModalContainer
                        isSendingFeedback={props.isSendingFeedback}
                        finishAndSendFeedback={finishAndSendFeedback}
                        userInformation={userInformation}
                        setUserInformation={setUserInformation}
                        resetFeedback={resetFeedback}
                        showChoooseFeedbackModeModal={props.feedbackModal === FeedbackModal.ChooseFeedbackModeModal}
                        showReceiveUpdatesModal={props.feedbackModal === FeedbackModal.ReceiveUpdatesModal}
                        showFeedbackDiscardChangesModal={props.feedbackModal === FeedbackModal.ConfirmDiscardChangesModal}
                        onChangeNameOrOtherDetailPress={props.chooseChangeNameOrDetail}
                        onChooseRemoveServicePress={props.chooseRemoveService}
                        onChooseOtherChangesPress={props.chooseOtherChanges}
                        onClosePress={props.close}
                        onKeepEditingPress={props.cancelDiscardFeedback}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

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
    readonly currentPathForAnalytics: string;
}

const ServiceContactDetails = (props: ServiceContactDetailsProps): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    const currentPathForAnalytics = props.currentPathForAnaltyics;
    const physicalAddresses = filterPhysicalAddresses(props.service.addresses);

    return (
        <>
            <FeedbackComponent
                setFeedbackField={props.setFeedbackForField('address')}
                feedbackField={props.feedback.address}
                fieldLabel={<Trans>Address</Trans>}
                fieldValue={getAddressesString(physicalAddresses)}
                isEditableService={props.isEditableService}
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
                isEditableService={props.isEditableService}
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
                isEditableService={props.isEditableService}
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
                isEditableService={props.isEditableService}
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

const SuggestAnUpdateButton = (props: { readonly isVisible: boolean, readonly suggestAnUpdate: () => void } ): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View style={{flexDirection: 'row-reverse', marginBottom: 20}}>
        <TouchableOpacity
            onPress={props.suggestAnUpdate}
            style={{ borderWidth: 1, borderColor: colors.greyBorder, borderRadius: 20 , paddingVertical: 10, paddingHorizontal: 16 }}
        >
            <View style={{ flexDirection: 'row'}}>
                <ServiceDetailIconComponent name={'edit'} />
                <Text style={[textStyles.paragraphBoldBlackLeft, { marginLeft: 5 }]}>
                    <Trans>Suggest an update</Trans>
                </Text>
            </View>
        </TouchableOpacity>
    </View>
    );
};

const getAddressesString = (addresses: ReadonlyArray<Address>): string => (
    addresses.map((address: Address): string => `${address.address}\n${address.city} ${address.stateProvince} ${address.postalCode}`).join('\n')
);

const getPhonesString = (phones: ReadonlyArray<PhoneNumber>): string => (
    phones.map((phone: PhoneNumber): string => `${phone.type}: ${phone.phone_number}`).join('\n')
);
