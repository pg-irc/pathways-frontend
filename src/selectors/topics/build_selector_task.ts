import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectLocale } from '../locale/select_locale';
import { Topic } from './topic';
import { toSelectorTopicWithoutRelatedEntities } from './to_selector_topic_without_related_entities';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

export const buildSelectorTask = R.curry((appStore: Store, topic: store.Topic): Topic => {
    const locale = selectLocale(appStore);
    const exploreSection = selectExploreSectionFromTask(appStore, topic);
    const isRecommended = true;
    return toSelectorTopicWithoutRelatedEntities(locale, topic, exploreSection, isRecommended);
});
