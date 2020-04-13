// tslint:disable: typedef
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { FeedbackScreen, UserInformation, FeedbackModal, ServiceFeedback, FeedbackStore, OtherFeedback, RemoveServiceFeedback } from './types';
export { reducer } from './reducer';
export { FeedbackStore } from './types';

export const buildDefaultStore = (): FeedbackStore => ({
    screen: FeedbackScreen.ServiceDetail,
    modal: FeedbackModal.None,
    userInformation: undefined,
    feedback: undefined,
});

export const suggestAnUpdate = () => helpers.makeAction(constants.SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(constants.CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(constants.CHOOSE_REMOVE_SERVICE);
export const chooseOtherChanges = () => helpers.makeAction(constants.CHOOSE_OTHER_CHANGES);
export const discardChanges = () => helpers.makeAction(constants.DISCARD_CHANGES);
export const close = () => helpers.makeAction(constants.CLOSE);
export const back = () => helpers.makeAction(constants.BACK);
export const submit = (feedback: ServiceFeedback | OtherFeedback | RemoveServiceFeedback) => (
    helpers.makeAction(constants.SUBMIT, { feedback })
);

export const finishFeedback = (userInformation: UserInformation = undefined) => (
    helpers.makeAction(constants.FINISH_FEEDBACK, { userInformation })
);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;
export type ChooseRemoveServiceAction = Readonly<ReturnType<typeof chooseRemoveService>>;
export type ChooseOtherChangesAction = Readonly<ReturnType<typeof chooseOtherChanges>>;
export type DiscardChangesAction = Readonly<ReturnType<typeof discardChanges>>;
export type CloseAction = Readonly<ReturnType<typeof close>>;
export type BackAction = Readonly<ReturnType<typeof back>>;
export type SubmitAction = Readonly<ReturnType<typeof submit>>;
export type FinishAction = Readonly<ReturnType<typeof finishFeedback>>;

export type ReducerActions = SuggestAnUpdateAction |
        ChooseChangeNameOrDetailsAction |
        ChooseRemoveServiceAction |
        ChooseOtherChangesAction |
        DiscardChangesAction |
        CloseAction |
        BackAction |
        SubmitAction |
        FinishAction;
