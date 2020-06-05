// tslint:disable: typedef
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { FeedbackScreen, UserInformation, FeedbackModal, FeedbackStore, Feedback, ServiceFeedback } from './types';
export { reducer } from './reducer';
export { FeedbackStore } from './types';

export const buildDefaultStore = (): FeedbackStore => ({
    screen: FeedbackScreen.ServiceDetail,
    modal: FeedbackModal.None,
    userInformation: undefined,
    feedback: undefined,
    isSending: false,
    error: '',
});

export const suggestAnUpdate = () => helpers.makeAction(constants.SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(constants.CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(constants.CHOOSE_REMOVE_SERVICE);
export const chooseOtherChanges = () => helpers.makeAction(constants.CHOOSE_OTHER_CHANGES);
export const discardChanges = () => helpers.makeAction(constants.DISCARD_CHANGES);
export const cancelDiscardChanges = () => helpers.makeAction(constants.CANCEL_DISCARD_CHANGES);
export const close = () => helpers.makeAction(constants.CLOSE);
export const submit = (feedback: Feedback) => (
    helpers.makeAction(constants.SUBMIT, { feedback })
);
export const finishFeedback = (userInformation: UserInformation) => (
    helpers.makeAction(constants.FINISH_FEEDBACK, { userInformation })
);
export const sendFeedback = (serviceId: string) => (
    helpers.makeAction(constants.SEND_FEEDBACK, { serviceId })
);
export const setIsSending = (isSending: boolean) => (
    helpers.makeAction(constants.SET_IS_SENDING, { isSending })
);
export const setError = (error: string) => (
    helpers.makeAction(constants.SET_ERROR, { error })
);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;
export type ChooseRemoveServiceAction = Readonly<ReturnType<typeof chooseRemoveService>>;
export type ChooseOtherChangesAction = Readonly<ReturnType<typeof chooseOtherChanges>>;
export type DiscardChangesAction = Readonly<ReturnType<typeof discardChanges>>;
export type CancelDiscardChangesAction = Readonly<ReturnType<typeof cancelDiscardChanges>>;
export type CloseAction = Readonly<ReturnType<typeof close>>;
export type SubmitAction = Readonly<ReturnType<typeof submit>>;
export type FinishAction = Readonly<ReturnType<typeof finishFeedback>>;
export type SendFeedbackAction = Readonly<ReturnType<typeof sendFeedback>>;
export type SetIsSendingAction = Readonly<ReturnType<typeof setIsSending>>;
export type SetErrorAction = Readonly<ReturnType<typeof setError>>;

export type ReducerActions = SuggestAnUpdateAction |
        ChooseChangeNameOrDetailsAction |
        ChooseRemoveServiceAction |
        ChooseOtherChangesAction |
        DiscardChangesAction |
        CancelDiscardChangesAction |
        CloseAction |
        SubmitAction |
        FinishAction |
        SendFeedbackAction |
        SetIsSendingAction |
        SetErrorAction;

export const getEmptyUserInfo = (): UserInformation => ({
    email: '',
    name: '',
    organizationName: '',
    jobTitle: '',
    isEmployee: false,
});

export const getEmptyServiceFeedback = (shouldSend: boolean = true): ServiceFeedback => {
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
