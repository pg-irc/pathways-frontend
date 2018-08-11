import { Store } from '../../stores';
import { selectLocale } from '../locale';
import { selectExploreTaxonomy } from '../taxonomies';
import { ExploreSection } from './types';
import { buildExploreSectionList } from './build_explore_section_list';

export const selectExploreSectionList = (store: Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return buildExploreSectionList(locale, sections, exploreTaxonomy);
};
