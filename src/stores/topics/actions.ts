import { Id } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { UserDataPersistence } from '../user_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;

export type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (topicId: Id) => {
    return helpers.makeAction(constants.ADD_TO_SAVED_TOPICS, { topicId });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (topicId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_TOPICS, { topicId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (topicId: Id) => (
    helpers.makeAction(constants.TOGGLE_IS_TOPIC_COMPLETED, { topicId })
);
