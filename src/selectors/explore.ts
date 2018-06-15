import * as app from '../application/store';
import * as details from './details/explore';
import { selectLocale } from './locale';
import { selectRoute } from './route';
import { selectExploreTaxonomy } from './taxonomies';

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

export const selectCurrentExploreSection = (store: app.Store): ExploreSection => {
    const locale = selectLocale(store);
    const sectionId = selectRoute(store).pageId;
    const sections = store.applicationState.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.getExploreSectionById(locale, sectionId, sections, exploreTaxonomy);
};
