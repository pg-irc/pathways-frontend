import { buildDefaultStore, ReducerActions, getEmptyServiceFeedback, getEmptyUserInfo } from '.';
import * as constants from '../../application/constants';
import { FeedbackScreen, FeedbackModal, FeedbackStore } from './types';

export const reducer = (store: FeedbackStore = buildDefaultStore(), action?: ReducerActions): FeedbackStore => {
    if (!action) {
        return store;
    }
    if (store.modal === FeedbackModal.ChooseFeedbackModeModal) {
        return chooseModeReducer(store, action);
    }
    const isDataEntryScreen = store.screen === FeedbackScreen.EditableServiceDetailPage ||
        store.screen === FeedbackScreen.RemoveServicePage ||
        store.screen === FeedbackScreen.OtherChangesPage;

    if (isDataEntryScreen) {
        return submitOrDiscardReducer(store, action);
    }
    switch (action.type) {
        case constants.SUGGEST_AN_UPDATE:
            return {
                ...store,
                feedback: getEmptyServiceFeedback(),
                userInformation: getEmptyUserInfo(),
                modal: FeedbackModal.ChooseFeedbackModeModal,
            };
        case constants.DISCARD_CHANGES:
            return buildDefaultStore();
        case constants.FINISH_FEEDBACK:
            return {
                ...store,
                screen: FeedbackScreen.ServiceDetail,
                userInformation: action.payload.userInformation};
        case constants.SET_IS_SENDING:
            return { ...store, isSending: action.payload.isSending };
        case constants.SET_ERROR:
            return { ...store, error: action.payload.error };
        case constants.BACK_FROM_CONTACT_INFORMATION:
            return backButtonReducer(store);
        default:
            return store;
    }
};

const chooseModeReducer = (store: FeedbackStore, action: ReducerActions): FeedbackStore => {
    switch (action.type) {
        case constants.CHOOSE_CHANGE_NAME_AND_DETAILS:
            return { ...store, screen: FeedbackScreen.EditableServiceDetailPage, modal: FeedbackModal.None };
        case constants.CHOOSE_REMOVE_SERVICE:
            return { ...store, screen: FeedbackScreen.RemoveServicePage, modal: FeedbackModal.None };
        case constants.CHOOSE_OTHER_CHANGES:
            return { ...store, screen: FeedbackScreen.OtherChangesPage, modal: FeedbackModal.None };
        case constants.CHOOSE_EXPLAIN_FEEDBACK:
            return { ...store, screen: FeedbackScreen.ExplainFeedback, modal:FeedbackModal.None}
        case constants.CLOSE:
            return {...store, screen: FeedbackScreen.ServiceDetail, modal: FeedbackModal.None };
        default:
            return store;
    }
};

const submitOrDiscardReducer = (store: FeedbackStore, action: ReducerActions): FeedbackStore => {
    switch (action.type) {
        case constants.SUBMIT:
            return {
                ...store, feedback: action.payload.feedback, screen: FeedbackScreen.ContactInformationPage,
            };
        case constants.CLOSE:
            return { ...store, modal: FeedbackModal.None, screen: FeedbackScreen.ServiceDetail };
        case constants.CLOSE_WITH_FEEDBACK:
            return { ...store, modal: FeedbackModal.ConfirmDiscardChangesModal };
        case constants.DISCARD_CHANGES:
            return buildDefaultStore();
        case constants.CANCEL_DISCARD_CHANGES:
            return { ...store, modal: FeedbackModal.None };
        default:
            return store;
    }
};

const backButtonReducer = (store: FeedbackStore): FeedbackStore => {
    const feedback_type = store.feedback?.type || 'service_feedback';
    switch (feedback_type) {
        case 'service_feedback':
            return { ...store, modal: FeedbackModal.None, screen: FeedbackScreen.EditableServiceDetailPage };
        case 'remove_service':
            return { ...store, modal: FeedbackModal.None, screen: FeedbackScreen.RemoveServicePage };
        case 'other_feedback':
            return { ...store, modal: FeedbackModal.None, screen: FeedbackScreen.OtherChangesPage };
        case 'explain_feedback':
            return { ...store, modal: FeedbackModal.None, screen: FeedbackScreen.ExplainFeedback };
        default:
            return store;
    }
};
