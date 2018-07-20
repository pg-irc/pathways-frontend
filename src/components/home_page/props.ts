import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';
import { SetExplorePageAction, SetTaskDetailPageAction, SetPlanPageAction, SetQuestionnairePageAction } from '../../stores/page_switcher';
import { TaskListItem } from '../../selectors/tasks';
import { ExploreAllProps, ExploreAllActions } from '../explore/explore_all';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
}

export interface HomePageActions extends ExploreAllActions {
    readonly goToExplorePage: () => SetExplorePageAction;
    readonly goToPlanPage: () => SetPlanPageAction;
    readonly goToQuestionnaire: () => SetQuestionnairePageAction;
    readonly goToTaskDetail: (taskId: TaskId) => SetTaskDetailPageAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}
