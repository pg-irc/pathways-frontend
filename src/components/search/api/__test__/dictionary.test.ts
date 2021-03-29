// tslint:disable:no-expression-statement
import { RegionCode } from '../../../../validation/region/types';
import { processSearchTerm } from '../fetch_search_results_from_query';

describe('convert search term to taxonomy terms', () => {
    it('convert library', () => {
        const searchTerm = processSearchTerm('library', 'city', RegionCode.BC);
        expect(searchTerm).toEqual('public-access-computers-tools public-internet-access-sites libraries bc city');
    });

    it('do not convert terms not found in dictionary', () => {
        const searchTerm = processSearchTerm('not a term in dictionary', 'city', RegionCode.BC);
        expect(searchTerm).toEqual('not a term in dictionary bc city');
    });
});
