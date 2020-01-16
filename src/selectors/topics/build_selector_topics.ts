import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectLocale } from '../locale/select_locale';
import { Topic } from './types';
import { toSelectorTopicWithoutRelatedEntities } from './to_selector_topic_without_related_entities';
import { selectExploreSectionFromTopic } from './select_explore_section_from_topic';

export const buildSelectorTopic = R.curry((appStore: Store, topic: store.Topic): Topic => {
    const locale = selectLocale(appStore);
    const exploreSection = selectExploreSectionFromTopic(appStore, topic);
    const isRecommended = true;
    return toSelectorTopicWithoutRelatedEntities(locale, topic, exploreSection, isRecommended);
});
