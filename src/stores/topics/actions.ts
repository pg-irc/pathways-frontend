import { Id } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { UserDataPersistence } from '../user_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction, CloseQuestionnaireAction } from '../questionnaire/actions';

export type AddTopicToSavedListAction = Readonly<ReturnType<typeof addTopicToSavedList>>;

export type RemoveTopicFromSavedListAction = Readonly<ReturnType<typeof removeTopicFromSavedList>>;

export type ExpandDetailAction = Readonly<ReturnType<typeof expandDetail>>;

export type CollapseDetailAction = Readonly<ReturnType<typeof collapseDeail>>;

export type TopicAction =
    AddTopicToSavedListAction |
    RemoveTopicFromSavedListAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    CloseQuestionnaireAction |
    ExpandDetailAction |
    CollapseDetailAction;

// tslint:disable-next-line:typedef
export const addTopicToSavedList = (topicId: Id) => {
    return helpers.makeAction(constants.ADD_TOPIC_BOOKMARK, { topicId });
};

// tslint:disable-next-line:typedef
export const removeTopicFromSavedList = (topicId: Id) => (
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
