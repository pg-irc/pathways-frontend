import * as store from '../../stores/topics';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { TaskListItem } from './task_list_item';

export const toSelectorTaskWithoutRelatedEntities =
    (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean): Task => {
        const noRelatedTasks: ReadonlyArray<TaskListItem> = [];
        return toSelectorTask(locale, task, exploreSection, isRecommended, noRelatedTasks);
    };
