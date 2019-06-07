import { Store } from '../../stores';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { ExploreSection } from './types';
import { buildExploreSectionList } from './build_explore_section_list';

export const selectExploreSectionList = (store: Store): ReadonlyArray<ExploreSection> => {
<<<<<<< HEAD
    const locale = selectLocale(store);
    const sections = store.exploreSections.sections;
=======
    const sections = store.exploreSectionsInStore.sections;
>>>>>>> Issue #625 pull explore strings from PO files
    const exploreTaxonomy = pullExploreTaxonomy(store);
    return buildExploreSectionList(sections, exploreTaxonomy);
};
