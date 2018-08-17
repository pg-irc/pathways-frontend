import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { ExploreSection } from './types';
import { buildExploreSectionList } from './build_explore_section_list';

export const selectExploreSectionList = (store: Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const exploreTaxonomy = pullExploreTaxonomy(store);
    return buildExploreSectionList(locale, sections, exploreTaxonomy);
};
