import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { ExploreAllProps } from '../explore/explore_all';
import { Id as TaskId } from '../../stores/tasks';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}
