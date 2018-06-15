import * as app from '../application/store';
import * as model from '../stores/explore';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { selectRoute } from './route';

export interface ExploreSection {
    readonly id: string;
    readonly name: string;
    readonly introduction: string;
    readonly icon: string;
}

export const selectExploreSections = (store: app.Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.applicationState.exploreSectionsInStore.sections;
    return denormalizeSections(locale, sections);
};

// exported for testing only, TODO move into a details file to make it clear it should
// not be called directly from external production code
export const denormalizeSections =
    (locale: Locale, store: model.ExploreSectionMap): ReadonlyArray<ExploreSection> => {
        const buildSection = (id: string): ExploreSection => {
            const name = selectLocalizedText(locale, store[id].name);
            const introduction = selectLocalizedText(locale, store[id].introduction);
            const icon = store[id].icon;
            return { id, name, introduction, icon };
        };
        return R.map(buildSection, R.keys(store));
    };

export const selectCurrentExploreSection = (store: app.Store): ExploreSection => {
    const locale = selectLocale(store);
    const sectionId = selectRoute(store).pageId;
    const sections = store.applicationState.exploreSectionsInStore.sections;
    return getExploreSectionById(locale, sectionId, sections);
};

// exported for testing only, TODO move into a details file to make it clear it should
// not be called directly from external production code
export const getExploreSectionById =
    (locale: Locale, id: model.Id, sections: model.ExploreSectionMap): ExploreSection => {
        const theSection = sections[id];
        const name = selectLocalizedText(locale, theSection.name);
        const introduction = selectLocalizedText(locale, theSection.introduction);
        const icon = theSection.icon;

        return { id, name, introduction, icon };
    };
