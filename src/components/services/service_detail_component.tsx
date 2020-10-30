// tslint:disable: no-expression-statement
import React, { Dispatch, SetStateAction, useState, useRef, MutableRefObject } from 'react';
import { TouchableOpacity } from 'react-native';
import * as R from 'ramda';
import { History, Location } from 'history';
import { t } from '@lingui/macro';
import { Trans, I18n } from '@lingui/react';
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
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { ModalContainer } from '../feedback/modal_container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackButtonComponent } from '../header_button/back_button_component';
import { BookmarkButtonComponent } from '../bookmark_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HeaderComponent } from '../main/header_component';
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
    ChooseExplainFeedbackAction,
    CloseAction,
    DiscardChangesAction,
    getEmptyServiceFeedback,
    CancelDiscardChangesAction,
    SendFeedbackAction,
    CloseWithFeedbackAction,
    BackFromContactInformationAction,
} from '../../stores/feedback';
import { isAndroid } from '../../application/helpers/is_android';
import { HeaderComponent as FeedbackHeaderComponent} from '../feedback/header_component';
import { SubmitFeedbackButton } from '../feedback/submit_feedback_button';
import { ThankYouMessageOrEmptyComponent } from './thank_you_message_or_empty_component';
import { useKeyboardIsVisible } from '../use_keyboard_is_visible';
import { MultilineKeyboardDoneButton } from '../multiline_text_input_for_platform';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly serviceFeedback: ServiceFeedback;
    readonly feedbackType: string;
    readonly feedbackScreen: FeedbackScreen;
    readonly feedbackModal: FeedbackModal;
    readonly isSendingFeedback: boolean;
    readonly showLinkAlerts: boolean;
}

export interface ServiceDetailActions {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly suggestAnUpdate: () => SuggestAnUpdateAction;
    readonly chooseChangeNameOrDetail: () => ChooseChangeNameOrDetailsAction;
    readonly chooseRemoveService: () => ChooseRemoveServiceAction;
    readonly chooseOtherChanges: () => ChooseOtherChangesAction;
    readonly chooseExplainFeedback: () => ChooseExplainFeedbackAction;
    readonly submitFeedback: (feedback: Feedback) => SubmitAction;
    readonly finishFeedback: (userInformation: UserInformation) => FinishAction;
    readonly close: () => CloseAction;
    readonly closeWithFeedback: () => CloseWithFeedbackAction;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly sendFeedback: (serviceId: string) => SendFeedbackAction;
    readonly hideLinkAlerts: () => void;
    readonly backFromContactInformation: () => BackFromContactInformationAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;
type SetServiceFeedback = Dispatch<SetStateAction<ServiceFeedback>>;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    const serviceId = props.match.params.serviceId;
    const isFeedbackInputEnabled = props.feedbackScreen === FeedbackScreen.EditableServiceDetailPage;
    const scrollViewRef = useRef<KeyboardAwareScrollView>(undefined);
    const [feedbackInput, setFeedbackInput]: readonly [ServiceFeedback, SetServiceFeedback] = useState(props.serviceFeedback);
    const keyboardIsVisible = useKeyboardIsVisible();

    const setTextForField = R.curry((fieldName: keyof ServiceFeedback, fieldValue: FeedbackField, value: string): void => (
        setFeedbackInput({ ...feedbackInput, [fieldName]: { ...fieldValue, value  }})
    ));

    const toggleShouldSendForField = R.curry((fieldName: keyof ServiceFeedback, fieldValue: FeedbackField): void => {
        const shouldSend = !fieldValue.shouldSend;
        return setFeedbackInput({ ...feedbackInput, [fieldName]: { ...fieldValue, shouldSend }});
    });

    const chooseChangeNameOrDetail = (): void => {
        scrollToTop(scrollViewRef);
        resetInputs();
        props.chooseChangeNameOrDetail();
    };

    const chooseRemoveService = (): void => {
        goToRouteWithParameter(Routes.OtherFeedback, serviceId, props.history)();
        resetInputs();
        props.chooseRemoveService();
    };

    const chooseOtherChanges = (): void => {
        goToRouteWithParameter(Routes.OtherFeedback, serviceId, props.history)();
        resetInputs();
        props.chooseOtherChanges();
    };

    const chooseExplainFeedback = (): void => {
        goToRouteWithParameter(Routes.ExplainFeedback, serviceId, props.history)();
        resetInputs();
        props.chooseExplainFeedback();
    }

    const resetInputs = (): void => {
        setFeedbackInput(getEmptyServiceFeedback());
    };

    const onSubmitPress = (): void => {
        goToRouteWithParameter(Routes.ContactInformation, serviceId, props.history)();
        props.submitFeedback(feedbackInput);
    };

    const hasFeedbackToSend = (): boolean => {
        const sendableFeedback = R.pickBy(isSendableFeedbackField, feedbackInput);
        return R.not(R.isEmpty(sendableFeedback));
    };

    const isSendableFeedbackField = (value: FeedbackField): boolean => value.shouldSend === true && value.value.length > 0;

    const onBackButtonPress = (): void => {
        if (isOtherRemoveServiceFeedback(props.feedbackType)) {
            goToRouteWithParameter(Routes.OtherFeedback, serviceId, props.history)();
        }
        props.backFromContactInformation();
    };

    const onClosePress = (): void => {
        if (!hasFeedbackToSend()) {
            props.close();
        }
        props.closeWithFeedback();
    };

    return (
        <I18n>
            {
            (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
            <View style={{ flex: 1 }}>
                <ServiceDetailHeaderComponent
                    location={props.location}
                    history={props.history}
                    isFeedbackInputEnabled={isFeedbackInputEnabled}
                    service={props.service}
                    bookmarkedServicesIds={props.bookmarkedServicesIds}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openHeaderMenu={props.openHeaderMenu}
                    close={onClosePress}
                />
                <KeyboardAwareScrollView
                    enableResetScrollToCoords={false}
                    extraHeight={100}
                    extraScrollHeight={isAndroid() ? 100 : 0}
                    enableOnAndroid={true}
                    ref={scrollViewRef}
                >
                    <View padder>
                        <FeedbackComponent
                            setText={setTextForField('name')}
                            toggleShouldSend={toggleShouldSendForField('name')}
                            inputField={feedbackInput.name}
                            label={<Trans>Name</Trans>}
                            body={props.service.name}
                            isFeedbackInputEnabled={isFeedbackInputEnabled}
                            nonFeedbackComponent={<Name name={props.service.name} />}
                        />
                        <DividerComponent />
                        <FeedbackComponent
                            setText={setTextForField('organization')}
                            toggleShouldSend={toggleShouldSendForField('organization')}
                            inputField={feedbackInput.organization}
                            label={<Trans>Organization</Trans>}
                            body={props.service.organizationName}
                            isFeedbackInputEnabled={isFeedbackInputEnabled}
                            nonFeedbackComponent={<Organization name={props.service.organizationName} organizationId={props.service.organizationId} history={props.history} />}
                        />
                        <DividerComponent />
                        <FeedbackComponent
                            setText={setTextForField('description')}
                            toggleShouldSend={toggleShouldSendForField('description')}
                            inputField={feedbackInput.description}
                            label={<Trans>Description</Trans>}
                            body={props.service.description}
                            isFeedbackInputEnabled={isFeedbackInputEnabled}
                            nonFeedbackComponent={
                                <Description
                                    description={props.service.description}
                                    showLinkAlerts={props.showLinkAlerts}
                                    hideLinkAlerts={props.hideLinkAlerts} />
                            }
                        />
                        <DividerComponent />
                        <ServiceContactDetails
                            service={props.service}
                            currentPathForAnaltyics={props.location.pathname}
                            isFeedbackInputEnabled={isFeedbackInputEnabled}
                            setFeedbackInputForField={setTextForField}
                            toggleShouldSendForField={toggleShouldSendForField}
                            feedback={feedbackInput}
                            analyticsLinkPressed={props.analyticsLinkPressed}
                            currentPathForAnalytics={props.location.pathname}
                        />
                        <DividerComponent />
                        <SuggestAnUpdateButton
                            isVisible={props.feedbackScreen !== FeedbackScreen.EditableServiceDetailPage}
                            suggestAnUpdate={props.suggestAnUpdate}
                        />
                        <ModalContainer
                            serviceId={serviceId}
                            discardFeedback={props.discardFeedback}
                            showChooseFeedbackModeModal={props.feedbackModal === FeedbackModal.ChooseFeedbackModeModal}
                            showDiscardChangesModal={props.feedbackModal === FeedbackModal.ConfirmDiscardChangesModal}
                            chooseChangeNameOrDetail={chooseChangeNameOrDetail}
                            chooseRemoveService={chooseRemoveService}
                            chooseOtherChanges={chooseOtherChanges}
                            chooseExplainFeedback={chooseExplainFeedback}
                            close={props.close}
                            cancelDiscardFeedback={props.cancelDiscardFeedback}
                            onBackButtonPress={onBackButtonPress}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <MultilineKeyboardDoneButton isVisible={isAndroid() && keyboardIsVisible}/>
                <SubmitFeedbackButton
                    isVisible={isFeedbackInputEnabled && !keyboardIsVisible}
                    disabled={!hasFeedbackToSend()}
                    onPress={onSubmitPress}
                />
                <ThankYouMessageOrEmptyComponent
                    isSendingFeedback={props.isSendingFeedback}
                    i18n={i18n}
                />
            </View>
            )}
        </I18n>
    );
};

const isOtherRemoveServiceFeedback = (feedbackType: string): boolean => feedbackType !== 'service_feedback';

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

const Organization = (props: { readonly history: History, readonly name: string, organizationId: string }): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Provided by</Trans>: </Text>
            <TouchableOpacity onPress={goToRouteWithParameter(Routes.Organization, props.organizationId, props.history)}>
                <Text style={textStyles.URL}>{props.name.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

interface HeaderProps {
    readonly location: Location;
    readonly history: History;
    readonly isFeedbackInputEnabled: boolean;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly close: () => void;
}

const feedbackHeaderLabel = t`Change name or other details`;

const ServiceDetailHeaderComponent = (props: HeaderProps): JSX.Element => {
    if (props.isFeedbackInputEnabled) {
        return (
            <FeedbackHeaderComponent
                headerLabel={feedbackHeaderLabel}
                close={props.close}
            />
        );
    }
    return (
        <ServiceDetailHeader
            location={props.location}
            service={props.service}
            bookmarkedServicesIds={props.bookmarkedServicesIds}
            bookmarkService={props.bookmarkService}
            unbookmarkService={props.unbookmarkService}
            openHeaderMenu={props.openHeaderMenu}
        />
    );
};

const ServiceDetailHeader = (props: {
    readonly location: Location;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.ServiceDetail);
    const serviceId = params.serviceId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent textColor={colors.black} />;
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
    return (
        <HeaderComponent
            backgroundColor={backgroundColor}
            leftButton={leftButton}
            rightButtons={rightButtons}
        />
    );
};

interface DescriptionProps {
    readonly description: string;
    readonly showLinkAlerts: boolean;
    readonly hideLinkAlerts: () => void;
}

const Description = (props: DescriptionProps): JSX.Element => (
    <MarkdownBodyComponent
        body={props.description}
        shouldBeExpandable={true}
        showLinkAlerts={props.showLinkAlerts}
        hideLinkAlerts={props.hideLinkAlerts} />
);

interface ServiceContactDetailsProps {
    readonly service: HumanServiceData;
    readonly currentPathForAnaltyics: string;
    readonly feedback: ServiceFeedback;
    readonly isFeedbackInputEnabled: boolean;
    readonly setFeedbackInputForField: (fieldName: keyof ServiceFeedback) => (field: FeedbackField) => void;
    readonly toggleShouldSendForField: (fieldName: keyof ServiceFeedback) => (field: FeedbackField) => void;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
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
                setText={props.setFeedbackInputForField('address')}
                toggleShouldSend={props.toggleShouldSendForField('address')}
                inputField={props.feedback.address}
                label={<Trans>Address</Trans>}
                body={getAddressesString(physicalAddresses)}
                isFeedbackInputEnabled={props.isFeedbackInputEnabled}
                nonFeedbackComponent={
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
                setText={props.setFeedbackInputForField('phone')}
                toggleShouldSend={props.toggleShouldSendForField('phone')}
                inputField={props.feedback.phone}
                label={<Trans>Phone numbers</Trans>}
                body={buildPhonesString(props.service.phoneNumbers)}
                isFeedbackInputEnabled={props.isFeedbackInputEnabled}
                nonFeedbackComponent={
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
                setText={props.setFeedbackInputForField('website')}
                toggleShouldSend={props.toggleShouldSendForField('website')}
                inputField={props.feedback.website}
                label={<Trans>Website</Trans>}
                body={props.service.website}
                isFeedbackInputEnabled={props.isFeedbackInputEnabled}
                nonFeedbackComponent={
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
                setText={props.setFeedbackInputForField('email')}
                toggleShouldSend={props.toggleShouldSendForField('email')}
                inputField={props.feedback.email}
                label={<Trans>Email</Trans>}
                body={props.service.email}
                isFeedbackInputEnabled={props.isFeedbackInputEnabled}
                nonFeedbackComponent={
                    <EmailComponent
                        email={props.service.email}
                        linkContextForAnalytics={linkContextForAnalytics}
                        currentPathForAnalytics={currentPathForAnalytics}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                    />
                }
            />
            <DividerComponent />
            <ContentVerificationComponent verificationDate={props.service.lastVerifiedDate} />
        </>
    );
};

const SuggestAnUpdateButton = (props: { readonly isVisible: boolean, readonly suggestAnUpdate: () => void }): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ flexDirection: 'row-reverse', marginBottom: 20 }}>
            <TouchableOpacity
                onPress={props.suggestAnUpdate}
                style={{ borderWidth: 1, borderColor: colors.greyBorder, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16 }}
            >
                <View style={{ flexDirection: 'row' }}>
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

const buildPhonesString = (phones: ReadonlyArray<PhoneNumber>): string => (
    phones.map((phone: PhoneNumber): string => `${phone.type}: ${phone.phone_number}`).join('\n')
);
