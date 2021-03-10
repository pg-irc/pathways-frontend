// tslint:disable:no-expression-statement
import { convertSearchTerm } from '../fetch_search_results_from_query';

describe('convert search term to taxonomy terms', () => {
    it('convert library', () => {
        const searchTerm = convertSearchTerm('library');
        expect(searchTerm).toEqual('public-access-computers-tools public-internet-access-sites libraries');
    });

    it('do not convert terms not found in dictionary', () => {
        const searchTerm = convertSearchTerm('not a term in dictionary');
        expect(searchTerm).toEqual('not a term in dictionary');
    });
});
