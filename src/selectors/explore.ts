import * as app from '../application/store';
import * as details from './details/explore';
import { selectLocale } from './locale';
import { selectExploreTaxonomy } from './taxonomies';
import * as stores from '../stores/explore';

export interface ExploreSection {
    readonly id: string;
    readonly name: string;
    readonly introduction: string;
    readonly icon: string;
}

export const selectExploreSections = (store: app.Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.applicationState.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.denormalizeSections(locale, sections, exploreTaxonomy);
};

export const selectLearnByPathParameter = (store: app.Store, learnId: stores.Id): ExploreSection => {
    const locale = selectLocale(store);
    const sections = store.applicationState.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.getExploreSectionById(locale, learnId, sections, exploreTaxonomy);
};
