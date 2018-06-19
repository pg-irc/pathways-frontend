// tslint:disable:no-expression-statement readonly-array

import { computeUniqueKeyForSections } from '../compute_unique_key_for_sections';
import { aString } from '../../../application/__tests__/helpers/random_test_values';

describe('request', () => {

    it('should pull out the name of entities', () => {
        const data = [{ name: 'foo', icon: aString() }];
        expect(computeUniqueKeyForSections(data)).toEqual('"foo"');
    });

    it('should concatenate the names of multiple entities', () => {
        const data = [{ name: 'foo', icon: aString() }, { name: 'bar', icon: aString() }];
        expect(computeUniqueKeyForSections(data)).toEqual('"foobar"');
    });
});
