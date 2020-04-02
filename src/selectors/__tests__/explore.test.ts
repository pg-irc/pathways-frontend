// tslint:disable:no-let no-expression-statement
import { ExploreSection } from '../explore/types';
import { ExploreSectionMap } from '../../stores/explore';
import { ExploreTaxonomyId } from '../../stores/taxonomies';
import { aString } from '../../application/random_test_values';
import { ExploreSectionBuilder as StoreExploreSectionBuilder } from '../../stores/__tests__/helpers/explore_section_builder';
import { buildExploreSection } from '../explore/build_explore_section';
import { buildExploreSectionList } from '../explore/build_explore_section_list';

const theId = aString();
const theNameInEnglish = aString();
const theDescriptionInEnglish = aString();
const theIcon = aString();

const taxonomyId = ExploreTaxonomyId;
const taxonomyTermId = aString();

const theStore: ExploreSectionMap = {
    [theId]: {
        id: theId,
        name: theNameInEnglish,
        description: theDescriptionInEnglish,
        taxonomyTerms: [{
            taxonomyId,
            taxonomyTermId,
        }],
    },
};

const theExploreTaxonomy = {
    [taxonomyTermId]: {
        icon: theIcon,
    },
};

describe('denormalize all explore sections', () => {
    let section: ExploreSection = undefined;
    beforeEach(() => {
        section = buildExploreSectionList(theStore, theExploreTaxonomy)[0];
    });
    it('should return object with id', () => {
        expect(section.id).toBe(theId);
    });
    it('should return object with name in correct locale', () => {
        expect(section.name).toBe(theNameInEnglish);
    });
    it('should return object with description in correct locale', () => {
        expect(section.description).toBe(theDescriptionInEnglish);
    });
    it('should return object with icon id', () => {
        expect(section.icon).toBe(theIcon);
    });
});

describe('build selector explore section', () => {
    let section: ExploreSection = undefined;

    beforeEach(() => {

        const inputSection = new StoreExploreSectionBuilder().
            withId(theId).
            withName(theNameInEnglish).
            withDescription(theDescriptionInEnglish).
            build();

        section = buildExploreSection(inputSection, theIcon);
    });

    it('should return the section with the given id', () => {
        expect(section.id).toBe(theId);
    });
    it('should return the name in the given locale', () => {
        expect(section.name).toBe(theNameInEnglish);
    });
    it('should return the description in the given locale', () => {
        expect(section.description).toBe(theDescriptionInEnglish);
    });
    it('should return the icon', () => {
        expect(section.icon).toBe(theIcon);
    });
});
