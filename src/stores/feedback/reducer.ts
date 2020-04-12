import {FeedbackStore, buildDefaultStore, ReducerActions, FeedbackScreen } from '.';
import { SUGGEST_AN_UPDATE, DISCARD_CHANGES, FINISH_FEEDBACK,
     CHOOSE_CHANGE_NAME_AND_DETAILS, CHOOSE_REMOVE_SERVICE,
     CHOOSE_OTHER_CHANGES, CLOSE, SUBMIT, BACK } from '../../application/constants';

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
        case SUGGEST_AN_UPDATE:
            return { ...store, screen: FeedbackScreen.ChooseFeedbackModeModal };
        case DISCARD_CHANGES:
            return { ...store, screen: FeedbackScreen.ServiceDetail };
       case FINISH_FEEDBACK:
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
        case CHOOSE_CHANGE_NAME_AND_DETAILS:
            return { ...store, screen: FeedbackScreen.EditableServiceDetailPage};
        case CHOOSE_REMOVE_SERVICE:
            return { ...store, screen: FeedbackScreen.RemoveServicePage};
        case CHOOSE_OTHER_CHANGES:
            return { ...store, screen: FeedbackScreen.OtherChangesPage};
        case CLOSE:
            return {...store, screen: FeedbackScreen.ServiceDetail };
        default:
            return store;
    }
};

const submitOrDiscardReducer = (store: FeedbackStore, action: ReducerActions): FeedbackStore => {
    switch (action.type) {
        case SUBMIT:
            return { ...store, screen: FeedbackScreen.ReceiveUpdatesModal};
        case CLOSE:
            return { ...store, screen: FeedbackScreen.ConfirmDiscardChangesModal};
        case BACK:
            return { ...store, screen: FeedbackScreen.ConfirmDiscardChangesModal};
        default:
            return store;
    }
};
