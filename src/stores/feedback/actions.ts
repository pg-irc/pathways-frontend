import * as helpers from '../helpers/make_action';

export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
    EditableServiceDetailPage,
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    screen: FeedbackScreen.ServiceDetail,
});

export type FeedbackStore = Readonly<ReturnType<typeof buildDefaultStore>>;

const SUGGEST_AN_UPDATE = 'SUGGEST_AN_UPDATE';
const CHOOSE_CHANGE_NAME_AND_DETAILS = 'CHOOSE_CHANGE_NAME_AND_DETAILS';

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(CHOOSE_CHANGE_NAME_AND_DETAILS);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;
export type ChooseChangeNameOrDetailsAction = Readonly<ReturnType<typeof chooseChangeNameOrDetails>>;

type Action = SuggestAnUpdateAction |
    ChooseChangeNameOrDetailsAction;

export const reduce = (store: FeedbackStore = buildDefaultStore(), action?: Action): FeedbackStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case SUGGEST_AN_UPDATE:
            return { screen: FeedbackScreen.ChooseFeedbackModeModal };
        case CHOOSE_CHANGE_NAME_AND_DETAILS:
            return {screen: FeedbackScreen.EditableServiceDetailPage};
        default:
            return store;
    }
};
