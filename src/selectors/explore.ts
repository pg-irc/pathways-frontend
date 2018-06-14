import * as app from '../application/store';
import * as model from '../stores/explore';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';

export interface ExploreSection {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
}

export const selectExploreSections = (store: app.Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.applicationState.exploreSectionsInStore.sections;
    return denormalizeSections(locale, sections);
};

export const denormalizeSections = (locale: Locale, store: model.ExploreSectionMap): ReadonlyArray<ExploreSection> => {
    const buildSection = (id: string): ExploreSection => {
        const name = selectLocalizedText(locale, store[id].name);
        const icon = store[id].icon;
        return { id, name, icon };
    };
    return R.map(buildSection, R.keys(store));
};

export const selectCurrentExploreSection = (store: app.Store): ExploreSection => {
    const locale = selectLocale(store);
    const sectionId = store.applicationState.currentPageInStore.pageId;
    const allSections = store.applicationState.exploreSectionsInStore.sections;
    const section = allSections[sectionId];
    return {
        id: section.id,
        name: selectLocalizedText(locale, section.name),
        icon: section.icon,
    };
};
