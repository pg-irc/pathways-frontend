import * as helpers from '../helpers/make_action';

export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
    EditableServiceDetailPage,
    RemoveServicePage,
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    screen: FeedbackScreen.ServiceDetail,
});

export type FeedbackStore = Readonly<ReturnType<typeof buildDefaultStore>>;

const SUGGEST_AN_UPDATE = 'SUGGEST_AN_UPDATE';
const CHOOSE_CHANGE_NAME_AND_DETAILS = 'CHOOSE_CHANGE_NAME_AND_DETAILS';
const CHOOSE_REMOVE_SERVICE = 'CHOOSE_REMOVE_SERVICE';

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(CHOOSE_REMOVE_SERVICE);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;
export type ChooseRemoveServiceAction = Readonly<ReturnType<typeof chooseRemoveService>>;

type ReducerActions = SuggestAnUpdateAction |
        ChooseChangeNameOrDetailsAction |
        ChooseRemoveServiceAction;

export const reduce = (store: FeedbackStore = buildDefaultStore(), action?: ReducerActions): FeedbackStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case SUGGEST_AN_UPDATE:
            return { screen: FeedbackScreen.ChooseFeedbackModeModal };
        case CHOOSE_CHANGE_NAME_AND_DETAILS:
            return {screen: FeedbackScreen.EditableServiceDetailPage};
        case CHOOSE_REMOVE_SERVICE:
            return {screen: FeedbackScreen.RemoveServicePage};
        default:
            return store;
    }
};
