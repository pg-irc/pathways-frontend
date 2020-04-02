// tslint:disable:no-expression-statement no-let
import { ExploreTaxonomyId, TaxonomyTermReference } from '../../stores/taxonomies';
import { aString } from '../../application/helpers/random_test_values';
import { TopicBuilder } from '../../stores/__tests__/helpers/topics_helpers';
import { TopicMap } from '../../stores/topics';
import { findItemsByExploreTaxonomyTerm } from '../taxonomies/find_items_by_explore_taxonomy_term';

describe('find topic by explore taxonomy term', () => {
    let exploreTerm: TaxonomyTermReference;
    let topicId: string;
    let topics: TopicMap;

    beforeEach(() => {
        exploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        topicId = aString();
        topics = {
            [topicId]: new TopicBuilder().withId(topicId).withTaxonomyTerm(exploreTerm).build(),
        };
    });

    it('should return a topic tagged with the given taxonomy term', () => {
        const found = findItemsByExploreTaxonomyTerm([exploreTerm], topics);
        expect(found[0].id).toBe(topicId);
    });

    it('should not return a topic tagged with a different explore taxonomy term', () => {
        const aDifferentExploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        const found = findItemsByExploreTaxonomyTerm([aDifferentExploreTerm], topics);
        expect(found).toHaveLength(0);
    });

    it('should not return a topic tagged with non-explore taxonomy term', () => {
        const aDifferentTaxonomyId = aString();
        const aNonExploreTerm = {
            taxonomyId: aDifferentTaxonomyId,
            taxonomyTermId: exploreTerm.taxonomyTermId,
        };
        topics = {
            [topicId]: new TopicBuilder().withId(topicId).withTaxonomyTerm(aNonExploreTerm).build(),
        };
        const found = findItemsByExploreTaxonomyTerm([aNonExploreTerm], topics);
        expect(found).toHaveLength(0);
    });

    it('should not return a topic when called with no expore terms', () => {
        const found = findItemsByExploreTaxonomyTerm([], topics);
        expect(found).toHaveLength(0);
    });
});
