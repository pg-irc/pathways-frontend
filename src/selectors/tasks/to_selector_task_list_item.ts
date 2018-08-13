import * as store from '../../stores/tasks';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { TaskListItem } from '.';

export const toSelectorTaskListItem = (locale: Locale, task: store.Task, isRecommended: boolean): TaskListItem => (
    {
        id: task.id,
        title: getLocalizedText(locale, task.title),
        description: getLocalizedText(locale, task.description),
        isRecommended: isRecommended,
        completed: task.completed,
    }
);
