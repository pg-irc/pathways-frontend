import { Store } from '../../stores';
import * as details from '../details/explore';
import { selectLocale } from '../locale';
import { selectExploreTaxonomy } from '../taxonomies';
import { RouterProps } from '../../application/routing';
import { selectIconFromExploreTaxonomy } from '../select_icon_from_explore_taxonomy';

export interface ExploreSection {
    readonly id: string;
    readonly name: string;
    readonly introduction: string;
    readonly icon: string;
}

export const selectLearn = (store: Store, routerProps: RouterProps): ExploreSection => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const id = routerProps.match.params.learnId;
    const theSection = sections[id];
    const exploreTaxonomy = selectExploreTaxonomy(store);
    const icon = selectIconFromExploreTaxonomy(theSection.taxonomyTerms, exploreTaxonomy);
    return details.buildExploreSection(locale, theSection, icon);
};
