import * as helpers from '../helpers/make_action';

export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
    EditableServiceDetailPage,
    RemoveServicePage,
    OtherChangesPage,
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    screen: FeedbackScreen.ServiceDetail,
});

export type FeedbackStore = Readonly<ReturnType<typeof buildDefaultStore>>;

const SUGGEST_AN_UPDATE = 'SUGGEST_AN_UPDATE';
const CHOOSE_CHANGE_NAME_AND_DETAILS = 'CHOOSE_CHANGE_NAME_AND_DETAILS';
const CHOOSE_REMOVE_SERVICE = 'CHOOSE_REMOVE_SERVICE';
const CHOOSE_OTHER_CHANGES = 'CHOOSE_OTHER_CHANGES';

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(CHOOSE_REMOVE_SERVICE);
export const chooseOtherChanges = () => helpers.makeAction(CHOOSE_OTHER_CHANGES);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;
export type ChooseRemoveServiceAction = Readonly<ReturnType<typeof chooseRemoveService>>;
export type ChooseOtherChangesAction = Readonly<ReturnType<typeof chooseOtherChanges>>;

type ReducerActions = SuggestAnUpdateAction |
        ChooseChangeNameOrDetailsAction |
        ChooseRemoveServiceAction |
        ChooseOtherChangesAction;

export const reduce = (store: FeedbackStore = buildDefaultStore(), action?: ReducerActions): FeedbackStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case SUGGEST_AN_UPDATE:
            return { screen: FeedbackScreen.ChooseFeedbackModeModal };
        case CHOOSE_CHANGE_NAME_AND_DETAILS:
            return { screen: FeedbackScreen.EditableServiceDetailPage };
        case CHOOSE_REMOVE_SERVICE:
            return { screen: FeedbackScreen.RemoveServicePage };
        case CHOOSE_OTHER_CHANGES:
            return { screen: FeedbackScreen.OtherChangesPage };
        default:
            return store;
    }
};
