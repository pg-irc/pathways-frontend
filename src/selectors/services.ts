import { Task } from '../fixtures/tasks';
import { selectLocalizedText } from '../selectors/locale';
import { Locale } from '../locale';

export function createRelatedServicesQueryFromTask(locale: Locale, task: Task): string {
    return selectLocalizedText(locale, task.title).replace(' ', ',');
}