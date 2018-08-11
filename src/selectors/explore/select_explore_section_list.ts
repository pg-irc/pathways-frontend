import { Store } from '../../stores';
import * as details from '../details/explore';
import { selectLocale } from '../locale';
import { selectExploreTaxonomy } from '../taxonomies';
import { ExploreSection } from './types';

export const selectExploreSectionList = (store: Store): ReadonlyArray<ExploreSection> => {
    const locale = selectLocale(store);
    const sections = store.exploreSectionsInStore.sections;
    const exploreTaxonomy = selectExploreTaxonomy(store);
    return details.denormalizeSections(locale, sections, exploreTaxonomy);
};
