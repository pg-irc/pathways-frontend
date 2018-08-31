import { Id } from '../../fixtures/types/tasks';
import { Task as constants } from '../../application/constants';
import { ClearErrorAction } from '../questionnaire/actions';
import { UserData } from '../user_data';
import * as helpers from '../helpers/make_action';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;

export type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    UserData.LoadRequestAction |
    UserData.LoadSuccessAction |
    UserData.LoadFailureAction |
    ClearErrorAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (taskId: Id) => {
    const notificationText = 'Task added to my plan';
    return helpers.makeAction(constants.ADD_TO_SAVED_LIST, { taskId, notificationText });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (taskId: Id) => (
    helpers.makeAction(constants.TOGGLE_COMPLETED, { taskId })
);
