// tslint:disable:no-expression-statement
// tslint:disable:no-let

import { selectIconFromExploreTaxonomy } from '../explore/select_icon_from_explore_taxonomy';
import { ExploreTaxonomyId, TaxonomyTermReference, Taxonomy } from '../../stores/taxonomies';
import { aString } from '../../application/helpers/random_test_values';

const taxonomyRefsWithExploreTerm = (term: string): ReadonlyArray<TaxonomyTermReference> => ([
    {
        taxonomyId: ExploreTaxonomyId,
        taxonomyTermId: term,
    },
]);

describe('selecting icon from explore taxonomy', () => {

    it('should look up the icon from the taxonomy', () => {
        const anExploreTerm = aString();
        const anIconId = aString();
        const taxonomyRefs = taxonomyRefsWithExploreTerm(anExploreTerm);
        const exploreTaxonomy: Taxonomy = {
            [anExploreTerm]: {
                icon: anIconId,
            },
        };
        expect(selectIconFromExploreTaxonomy(taxonomyRefs, exploreTaxonomy)).toBe(anIconId);
    });

    it('should return question mark if there is no matching taxonomy term', () => {
        const anExploreTerm = aString();
        const aDifferentExploreTerm = aString();
        const taxonomyRefs = taxonomyRefsWithExploreTerm(anExploreTerm);
        const exploreTaxonomy: Taxonomy = {
            [aDifferentExploreTerm]: {
                icon: aString(),
            },
        };
        expect(selectIconFromExploreTaxonomy(taxonomyRefs, exploreTaxonomy)).toBe('help-circle');
    });

    it('should return question mark if taxonomy terms contain no explore taxonomy terms', () => {
        const anExploreTerm = aString();
        const anIconId = aString();
        const taxonomyRefs: ReadonlyArray<TaxonomyTermReference> = [];
        const exploreTaxonomy: Taxonomy = {
            [anExploreTerm]: {
                icon: anIconId,
            },
        };
        expect(selectIconFromExploreTaxonomy(taxonomyRefs, exploreTaxonomy)).toBe('help-circle');
    });

    it('should return question mark if explore taxonomy terms contains no icon', () => {
        const anExploreTerm = aString();
        const taxonomyRefs = taxonomyRefsWithExploreTerm(anExploreTerm);
        const exploreTaxonomy: Taxonomy = {
            [anExploreTerm]: {},
        };
        expect(selectIconFromExploreTaxonomy(taxonomyRefs, exploreTaxonomy)).toBe('help-circle');
    });
});
