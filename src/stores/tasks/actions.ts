import { Id } from '../../fixtures/types/tasks';
import * as constants from '../../application/constants';
import { ClearErrorAction } from '../clear_error';
import { UserDataPersistence } from '../user_data';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;

export type SaveTheseTasksToMyPlanAction = Readonly<ReturnType<typeof saveTheseTasksToMyPlan>>;

export type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    SaveTheseTasksToMyPlanAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (taskId: Id) => {
    return helpers.makeAction(constants.ADD_TO_SAVED_TASKS, { taskId });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_TASKS, { taskId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (taskId: Id) => (
    helpers.makeAction(constants.TOGGLE_IS_TASK_COMPLETED, { taskId })
);

// tslint:disable-next-line:typedef
export const saveTheseTasksToMyPlan = (taskIds: ReadonlyArray<Id>) => (
    helpers.makeAction(constants.SAVE_THESE_TASKS_TO_MY_PLAN, { taskIds })
);
