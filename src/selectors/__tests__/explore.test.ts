// tslint:disable:no-let no-expression-statement
import { denormalizeSections, getExploreSectionById } from '../details/explore';
import { ExploreSection } from '../explore';
import { ExploreSectionMap } from '../../stores/explore';
import { ExploreTaxonomyId } from '../../stores/taxonomies';
import { aString } from '../../application/__tests__/helpers/random_test_values';

const englishLocale = { code: 'en', fallback: 'ar' };
const theId = aString();
const theNameInEnglish = aString();
const theIntroductionInEnglish = aString();
const theIcon = aString();

const taxonomyId = ExploreTaxonomyId;
const taxonomyTermId = aString();

const theStore: ExploreSectionMap = {
    [theId]: {
        id: theId,
        name: {
            'en': theNameInEnglish,
            'ar': aString(),
            'zh': aString(),
        },
        introduction: {
            'en': theIntroductionInEnglish,
            'ar': aString(),
            'zh': aString(),
        },
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
        section = denormalizeSections(englishLocale, theStore, theExploreTaxonomy)[0];
    });
    it('should return object with id', () => {
        expect(section.id).toBe(theId);
    });
    it('should return object with name in correct locale', () => {
        expect(section.name).toBe(theNameInEnglish);
    });
    it('should return object with introduction in correct locale', () => {
        expect(section.introduction).toBe(theIntroductionInEnglish);
    });
    it('should return object with icon id', () => {
        expect(section.icon).toBe(theIcon);
    });
});

describe('get section by id', () => {
    let section: ExploreSection = undefined;
    beforeEach(() => {
        section = getExploreSectionById(englishLocale, theId, theStore, theExploreTaxonomy);
    });
    it('should return the section with the given id', () => {
        expect(section.id).toBe(theId);
    });
    it('should return the name in the given locale', () => {
        expect(section.name).toBe(theNameInEnglish);
    });
    it('should return the introduction in the given locale', () => {
        expect(section.introduction).toBe(theIntroductionInEnglish);
    });
    it('should return the icon', () => {
        expect(section.icon).toBe(theIcon);
    });
});