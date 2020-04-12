import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
export {reducer} from './reducer';

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

export interface UserInformation {
    readonly email: string;
    readonly name: string;
    readonly organizationName: string;
    readonly jobTitle: string;
}

// tslint:disable: typedef
export const suggestAnUpdate = () => helpers.makeAction(constants.SUGGEST_AN_UPDATE);
export const chooseChangeNameOrDetails = () => helpers.makeAction(constants.CHOOSE_CHANGE_NAME_AND_DETAILS);
export const chooseRemoveService = () => helpers.makeAction(constants.CHOOSE_REMOVE_SERVICE);
export const chooseOtherChanges = () => helpers.makeAction(constants.CHOOSE_OTHER_CHANGES);
export const discardChanges = () => helpers.makeAction(constants.DISCARD_CHANGES);
export const close = () => helpers.makeAction(constants.CLOSE);
export const back = () => helpers.makeAction(constants.BACK);
export const submit = () => helpers.makeAction(constants.SUBMIT);
export const finishFeedback = (userInformation: UserInformation = emptyUserInformation) => (
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
