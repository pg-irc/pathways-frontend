import {FeedbackStore, buildDefaultStore, ReducerActions } from '.';
import * as constants from '../../application/constants';
import { FeedbackScreen } from './types';

export const reducer = (store: FeedbackStore = buildDefaultStore(), action?: ReducerActions): FeedbackStore => {
    if (!action) {
        return store;
    }
    if (store.screen === FeedbackScreen.ChooseFeedbackModeModal) {
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
            return { ...store, screen: FeedbackScreen.ChooseFeedbackModeModal };
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
            return { ...store, screen: FeedbackScreen.ReceiveUpdatesModal};
        case constants.CLOSE:
            return { ...store, screen: FeedbackScreen.ConfirmDiscardChangesModal};
        case constants.BACK:
            return { ...store, screen: FeedbackScreen.ConfirmDiscardChangesModal};
        default:
            return store;
    }
};
