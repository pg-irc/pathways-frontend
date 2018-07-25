import { Store } from '../stores';
import * as details from './details/explore';
import { selectLocale } from './locale';
import { selectExploreTaxonomy } from './taxonomies';
import { RouterProps } from '../application/routing';

export interface ExploreSection {
    readonly id: string;
    readonly name: string;
    readonly introduction: string;
    readonly icon: string;
}

export const selectLearnSections = (store: Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.denormalizeSections(locale, sections, exploreTaxonomy);
};

export const selectLearn = (store: Store, routerProps: RouterProps): ExploreSection => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.getExploreSectionById(locale, routerProps.match.params.learnId, sections, exploreTaxonomy);
};
