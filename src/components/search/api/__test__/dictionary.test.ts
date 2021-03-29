// tslint:disable:no-expression-statement
import { processSearchTerm } from '../fetch_search_results_from_query';

describe('convert search term to taxonomy terms', () => {
    it('convert library', () => {
        const searchTerm = processSearchTerm('library', 'bc');
        expect(searchTerm).toEqual('public-access-computers-tools public-internet-access-sites libraries bc');
    });

    it('do not convert terms not found in dictionary', () => {
        const searchTerm = processSearchTerm('not a term in dictionary', 'bc');
        expect(searchTerm).toEqual('not a term in dictionary bc');
    });
});
