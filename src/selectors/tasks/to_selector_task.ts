import * as store from '../../stores/tasks';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { TaskListItem } from './task_list_item';
import { Task } from './task';
import { createRelatedServicesQueryFromTask } from '../services/create_related_services_query_from_task';

export const toSelectorTask =
    (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean,
     relatedTasks: ReadonlyArray<TaskListItem>): Task => (
            {
                id: task.id,
                title: getLocalizedText(locale, task.title),
                description: getLocalizedText(locale, task.description),
                taxonomyTerms: task.taxonomyTerms,
                exploreSection,
                isRecommended,
                relatedTasks,
                completed: task.completed,
                serviceQuery: createRelatedServicesQueryFromTask(task),
            }
        );
