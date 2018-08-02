import { TaskListItem } from '../../selectors/tasks';
import { ExploreAllProps }  from '../explore/explore_all';
import { Id as TaskId } from '../../stores/tasks';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}
