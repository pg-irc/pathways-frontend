import * as select from './types';
import * as stores from '../../stores/explore';
import { Taxonomy } from '../../stores/taxonomies';
import { selectIconFromExploreTaxonomy } from './select_icon_from_explore_taxonomy';
import * as R from 'ramda';

export const buildExploreSectionList =
    (sections: stores.ExploreSectionMap, exploreTaxonomy: Taxonomy): ReadonlyArray<select.ExploreSection> => {

        const buildOneSectionForView = (id: string): select.ExploreSection => {
            const theSection = sections[id];
            const name = theSection.name
            const description = theSection.description;
            const icon = selectIconFromExploreTaxonomy(theSection.taxonomyTerms, exploreTaxonomy);

            return { id, name, description, icon };
        };

        return R.map(buildOneSectionForView, R.keys(sections));
    };
