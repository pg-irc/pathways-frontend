import * as app from '../application/store';
import * as model from '../stores/explore';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';

export interface ExploreSection {
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
        return { name, icon };
    };
    return R.map(buildSection, R.keys(store));
};

// TODO this needs to take an app store
// TODO this should pull out the locale itself
// TODO this needs to pull out the relevant ids from the routing state in the store
export const selectExploreSectionWithId = (locale: Locale, store: model.Store, sectionId: model.Id): ExploreSection => {
    const section = store.sections[sectionId];
    return {
        name: selectLocalizedText(locale, section.name),
        icon: section.icon,
    };
};
