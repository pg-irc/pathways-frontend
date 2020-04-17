import { buildDefaultStore, ReducerActions } from '.';
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
            return { ...store, modal: FeedbackModal.ChooseFeedbackModeModal };
        case constants.DISCARD_CHANGES:
            return { ...store, screen: FeedbackScreen.ServiceDetail };
       case constants.FINISH_FEEDBACK:
            return {
                ...store,
                screen: FeedbackScreen.ServiceDetail,
                userInformation: action.payload.userInformation};
        default:
            return store;
    }
};

const chooseModeReducer = (store: FeedbackStore, action: ReducerActions): FeedbackStore => {
    switch (action.type) {
        case constants.CHOOSE_CHANGE_NAME_AND_DETAILS:
            return { ...store, screen: FeedbackScreen.EditableServiceDetailPage};
        case constants.CHOOSE_REMOVE_SERVICE:
            return { ...store, screen: FeedbackScreen.RemoveServicePage};
        case constants.CHOOSE_OTHER_CHANGES:
            return { ...store, screen: FeedbackScreen.OtherChangesPage};
        case constants.CLOSE:
            return {...store, screen: FeedbackScreen.ServiceDetail };
        default:
            return store;
    }
};

const submitOrDiscardReducer = (store: FeedbackStore, action: ReducerActions): FeedbackStore => {
    switch (action.type) {
        case constants.SUBMIT:
            return { ...store, modal: FeedbackModal.ReceiveUpdatesModal, feedback: action.payload.feedback };
        case constants.CLOSE:
            return { ...store, modal: FeedbackModal.ConfirmDiscardChangesModal};
        case constants.BACK:
            return { ...store, modal:  FeedbackModal.ConfirmDiscardChangesModal};
        default:
            return store;
    }
};