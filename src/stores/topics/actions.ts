import { Id } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { DataPersistence } from '../persisted_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction, CloseQuestionnaireAction } from '../questionnaire/actions';

export type BookmarkTopicAction = Readonly<ReturnType<typeof bookmarkTopic>>;

export type UnbookmarkTopicAction = Readonly<ReturnType<typeof unbookmarkTopic>>;

export type ExpandDetailAction = Readonly<ReturnType<typeof expandDetail>>;

export type CollapseDetailAction = Readonly<ReturnType<typeof collapseDeail>>;

export type TopicAction = BookmarkTopicAction |
    UnbookmarkTopicAction |
    DataPersistence.LoadRequestAction |
    DataPersistence.LoadSuccessAction |
    DataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    CloseQuestionnaireAction |
    ExpandDetailAction |
    CollapseDetailAction;

// tslint:disable-next-line:typedef
export const bookmarkTopic = (topicId: Id) => {
    return helpers.makeAction(constants.BOOKMARK_TOPIC, { topicId });
};

// tslint:disable-next-line:typedef
export const unbookmarkTopic = (topicId: Id) => (
    helpers.makeAction(constants.UNBOOKMARK_TOPIC, { topicId })
);

// tslint:disable-next-line:typedef
export const expandDetail = (contentId: string) => (
    helpers.makeAction(constants.EXPAND_DETAIL, { contentId })
);

// tslint:disable-next-line:typedef
export const collapseDeail = (contentId: string) => (
    helpers.makeAction(constants.COLLAPSE_DETAIL, { contentId })
);
