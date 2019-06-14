import { Store } from '../../stores';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { ExploreSection } from './types';
import { buildExploreSectionList } from './build_explore_section_list';

export const selectExploreSectionList = (store: Store): ReadonlyArray<ExploreSection> => {
    const sections = store.exploreSections.sections;
    const exploreTaxonomy = pullExploreTaxonomy(store);
    return buildExploreSectionList(sections, exploreTaxonomy);
};
