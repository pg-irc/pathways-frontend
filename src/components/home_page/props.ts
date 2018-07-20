import { TaskListItem } from '../../selectors/tasks';
import { ExploreAllProps }  from '../explore/explore_all';

export interface HomePageProps extends ExploreAllProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
}
