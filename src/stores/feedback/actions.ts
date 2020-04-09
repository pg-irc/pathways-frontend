import * as helpers from '../helpers/make_action';

export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    screen: FeedbackScreen.ServiceDetail,
});

export type FeedbackStore = Readonly<ReturnType<typeof buildDefaultStore>>;

const SUGGEST_AN_UPDATE = 'SUGGEST_AN_UPDATE';

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(SUGGEST_AN_UPDATE);

export type SuggestAnUpdateAction = Readonly<ReturnType<typeof suggestAnUpdate>>;

type Action = SuggestAnUpdateAction;

export const reduce = (__: FeedbackStore = buildDefaultStore(), _?: Action): FeedbackStore => {
    return { screen: FeedbackScreen.ChooseFeedbackModeModal };
};
