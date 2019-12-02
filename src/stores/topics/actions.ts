import { Id } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { UserDataPersistence } from '../user_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction, CloseQuestionnaireAction } from '../questionnaire/actions';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ExpandDetailAction = Readonly<ReturnType<typeof expandDetail>>;

export type CollapseDetailAction = Readonly<ReturnType<typeof collapseDeail>>;

export type TopicAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ExpandDetailAction |
    CollapseDetailAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    CloseQuestionnaireAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (topicId: Id) => {
    return helpers.makeAction(constants.ADD_TOPIC_BOOKMARK, { topicId });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (topicId: Id) => (
    helpers.makeAction(constants.REMOVE_TOPIC_BOOKMARK, { topicId })
);

// tslint:disable-next-line:typedef
export const expandDetail = (contentId: string) => (
    helpers.makeAction(constants.EXPAND_DETAIL, { contentId })
);

// tslint:disable-next-line:typedef
export const collapseDeail = (contentId: string) => (
    helpers.makeAction(constants.COLLAPSE_DETAIL, { contentId })
);
