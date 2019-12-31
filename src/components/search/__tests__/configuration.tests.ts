// tslint:disable:no-expression-statement
import { toAlgoliaParameter, toServiceSearchConfiguration } from '../api/configuration';

describe('configuration', () => {
    describe('for service search', () => {
        it('includes lat/long if given', () => {
            expect(toServiceSearchConfiguration({ lat: 1, lng: 1 })).toEqual({
                hitsPerPage: 20,
                aroundLatLng: '1,1',
            });
        });
        it('does not includes lat/long if missing', () => {
            expect(toServiceSearchConfiguration()).toEqual({
                hitsPerPage: 20,
            });
        });
    });
    describe('conversion from lat/long to string for algolia', () => {
        it('returns latitude first', () => {
            expect(toAlgoliaParameter({ lat: 1.1, lng: 2.2 })).toEqual('1.1,2.2');
        });
    });
});
