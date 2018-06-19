// tslint:disable:no-let no-expression-statement
import { denormalizeSections } from '../explore';
import { ExploreSectionMap } from '../../stores/explore';

describe('denormalize all explore sections', () => {

    const theStore: ExploreSectionMap = {
        's1': {
            id: 's1',
            name: {
                'en': 'Settling in',
                'ar': 'تسوية في',
                'zh': '定居',
            },
            icon: 'sign-direction',
        },
    };

    const theLocale = { code: 'en', fallback: 'ar' };

    it('should return object with id', () => {
        expect(denormalizeSections(theLocale, theStore)[0].id).toBe('s1');
    });
    it('should return object with name in correct locale', () => {
        expect(denormalizeSections(theLocale, theStore)[0].name).toBe('Settling in');
    });
    it('should return object with icon id', () => {
        expect(denormalizeSections(theLocale, theStore)[0].icon).toBe('sign-direction');
    });
});
