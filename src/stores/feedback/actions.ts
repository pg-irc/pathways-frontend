import * as helpers from '../helpers/make_action';

export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
    EditableServiceDetailPage,
    RemoveServicePage,
    OtherChangesPage,
    ReceiveUpdatesModal,
    ConfirmDiscardChangesModal,
}
const emptyUserInformation = { email: '', name: '', organizationName: '', jobTitle: ''};

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    screen: FeedbackScreen.ServiceDetail,
    userInformation: emptyUserInformation,
});

export type FeedbackStore = Readonly<ReturnType<typeof buildDefaultStore>>;

const SUGGEST_AN_UPDATE = 'SUGGEST_AN_UPDATE';
const CHOOSE_CHANGE_NAME_AND_DETAILS = 'CHOOSE_CHANGE_NAME_AND_DETAILS';
const CHOOSE_REMOVE_SERVICE = 'CHOOSE_REMOVE_SERVICE';
const CHOOSE_OTHER_CHANGES = 'CHOOSE_OTHER_CHANGES';
const DISCARD_CHANGES = 'DISCARD_CHANGES';
const CLOSE = 'CLOSE';
const BACK = 'BACK';
const SUBMIT = 'SUBMIT';
const FINISH_FEEDBACK = 'FINISH_FEEDBACK';

interface UserInformation {
    readonly email: string;
    readonly name: string;
    readonly organizationName: string;
    readonly jobTitle: string;
}

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(CHOOSE_REMOVE_SERVICE);
export const chooseOtherChanges = () => helpers.makeAction(CHOOSE_OTHER_CHANGES);
export const discardChanges = () => helpers.makeAction(DISCARD_CHANGES);
export const close = () => helpers.makeAction(CLOSE);
export const back = () => helpers.makeAction(BACK);
export const submit = () => helpers.makeAction(SUBMIT);
export const finishFeedback = (userInformation: UserInformation = emptyUserInformation) => helpers.makeAction(FINISH_FEEDBACK, { userInformation });

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;
export type ChooseRemoveServiceAction = Readonly<ReturnType<typeof chooseRemoveService>>;
export type ChooseOtherChangesAction = Readonly<ReturnType<typeof chooseOtherChanges>>;
export type DiscardChangesAction = Readonly<ReturnType<typeof discardChanges>>;
export type CloseAction = Readonly<ReturnType<typeof close>>;
export type BackAction = Readonly<ReturnType<typeof back>>;
export type SubmitAction = Readonly<ReturnType<typeof submit>>;
export type FinishAction = Readonly<ReturnType<typeof finishFeedback>>;

type ReducerActions = SuggestAnUpdateAction |
        ChooseChangeNameOrDetailsAction |
        ChooseRemoveServiceAction |
        ChooseOtherChangesAction |
        DiscardChangesAction |
        CloseAction |
        BackAction |
        SubmitAction |
        FinishAction;

export const reduce = (store: FeedbackStore = buildDefaultStore(), action?: ReducerActions): FeedbackStore => {
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
