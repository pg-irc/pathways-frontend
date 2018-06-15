import * as model from '../../stores/explore';
import * as tax from '../../stores/taxonomies';
import * as R from 'ramda';
import { selectLocalizedText } from '../locale';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore';
import { selectIconFromExploreTaxonomy } from '../select_icon_from_explore_taxonomy';

export const denormalizeSections =
    (locale: Locale, store: model.ExploreSectionMap, exploreTaxonomy: tax.Taxonomy): ReadonlyArray<ExploreSection> => {
        const buildSection = (id: string): ExploreSection => {
            const name = selectLocalizedText(locale, store[id].name);
            const introduction = selectLocalizedText(locale, store[id].introduction);
            const icon = selectIconFromExploreTaxonomy(store[id].taxonomyTerms, exploreTaxonomy);
            return { id, name, introduction, icon };
        };
        return R.map(buildSection, R.keys(store));
    };

export const getExploreSectionById =
    (locale: Locale, id: model.Id, sections: model.ExploreSectionMap, exploreTaxonomy: tax.Taxonomy): ExploreSection => {
        const theSection = sections[id];
        const name = selectLocalizedText(locale, theSection.name);
        const introduction = selectLocalizedText(locale, theSection.introduction);
        const icon = selectIconFromExploreTaxonomy(theSection.taxonomyTerms, exploreTaxonomy);

        return { id, name, introduction, icon };
    };
