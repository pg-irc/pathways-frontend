import { Id } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { UserDataPersistence } from '../user_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction, CloseQuestionnaireAction } from '../questionnaire/actions';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ExpandTopicDetailAction = Readonly<ReturnType<typeof expandTopicDetail>>;

export type ReduceTopicDetailAction = Readonly<ReturnType<typeof reduceTopicDetail>>;

export type TopicAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ExpandTopicDetailAction |
    ReduceTopicDetailAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    CloseQuestionnaireAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (topicId: Id) => {
    return helpers.makeAction(constants.ADD_BOOKMARK, { topicId });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (topicId: Id) => (
    helpers.makeAction(constants.REMOVE_BOOKMARK, { topicId })
);

// tslint:disable-next-line:typedef
export const expandTopicDetail = (topicId: Id) => (
    helpers.makeAction(constants.EXPAND_DETAIL, { topicId })
);

// tslint:disable-next-line:typedef
export const reduceTopicDetail = (topicId: Id) => (
    helpers.makeAction(constants.REDUCE_DETAIL, { topicId })
);
