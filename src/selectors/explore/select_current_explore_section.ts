import { Store } from '../../stores';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { RouterProps } from '../../application/routing';
import { selectIconFromExploreTaxonomy } from './select_icon_from_explore_taxonomy';
import { ExploreSection } from './types';
import { buildExploreSection } from './build_explore_section';

export const selectCurrentExploreSection = (store: Store, routerProps: RouterProps): ExploreSection => {
<<<<<<< HEAD
    const locale = selectLocale(store);
    const sections = store.exploreSections.sections;
=======
    const sections = store.exploreSectionsInStore.sections;
>>>>>>> Issue #625 pull explore strings from PO files
    const id = routerProps.match.params.learnId;
    const theSection = sections[id];
    const exploreTaxonomy = pullExploreTaxonomy(store);
    const icon = selectIconFromExploreTaxonomy(theSection.taxonomyTerms, exploreTaxonomy);
    return buildExploreSection(theSection, icon);
};
