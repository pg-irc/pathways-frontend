// tslint:disable:no-expression-statement
import { toAlgoliaParameter, toServiceSearchConfiguration } from '../configuration';

describe('configuration', () => {
    describe('for service search', () => {
        it('includes lat/long if given', () => {
            expect(toServiceSearchConfiguration({ latitude: 1, longitude: 1 })).toEqual({
                hitsPerPage: 5,
                aroundLatLng: '1,1',
            });
        });
        it('does not includes lat/long if missing', () => {
            expect(toServiceSearchConfiguration()).toEqual({
                hitsPerPage: 5,
            });
        });
    });
    describe('conversion from lat/long to string for algolia', () => {
        it('returns latitude first', () => {
            expect(toAlgoliaParameter({ latitude: 1.1, longitude: 2.2 })).toEqual('1.1,2.2');
        });
    });
});
