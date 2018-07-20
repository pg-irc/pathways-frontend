import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';
import { TaskListItem } from '../../selectors/tasks';
import { ExploreAllProps, ExploreAllActions } from '../explore/explore_all';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
}

export interface HomePageActions extends ExploreAllActions {
    readonly goToTaskDetail: (taskId: TaskId) => SetTaskDetailPageAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}
