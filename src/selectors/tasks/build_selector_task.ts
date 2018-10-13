import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectLocale } from '../locale/select_locale';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

export const buildSelectorTask = R.curry((appStore: Store, task: store.Task): Task => {
    const locale = selectLocale(appStore);
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const isRecommended = true;
    return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
});
