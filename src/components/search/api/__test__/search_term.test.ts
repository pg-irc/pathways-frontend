// tslint:disable:no-expression-statement
import { RegionCode } from '../../../../validation/region/types';
import { checkDictionary, addLocationToSearchTerm, processSearchTerm, addRegionToSearchTerm } from '../fetch_search_results_from_query';

describe('convert certain search terms to taxonomy', () => {
    it('convert library', () => {
        const searchTerm = checkDictionary('library');
        expect(searchTerm).toEqual('public-access-computers-tools public-internet-access-sites libraries');
    });

    it('do not convert terms not found in dictionary', () => {
        const searchTerm = checkDictionary('not a term in dictionary');
        expect(searchTerm).toEqual('not a term in dictionary');
    });
});

describe('adding some locations to search term', () => {
    it('add Vancouver', () => {
        const searchTerm = addLocationToSearchTerm('library', 'Vancouver');
        expect(searchTerm).toEqual('library Vancouver');
    });

    it('do not add My Location', () => {
        const searchTerm = addLocationToSearchTerm('library', 'My Location');
        expect(searchTerm).toEqual('library');
    });

    it('do not add Custom Latlong', () => {
        const searchTerm = addLocationToSearchTerm('library', 'CustomLatLong(49.8951,-97.1384)');
        expect(searchTerm).toEqual('library');
    });

    it('do not add undefined', () => {
        const searchTerm = addLocationToSearchTerm('library', undefined);
        expect(searchTerm).toEqual('library');
    });
});

describe('adding region to search term', () => {
    it('add BC', () => {
        const searchTerm = addRegionToSearchTerm('library', RegionCode.BC);
        expect(searchTerm).toEqual('library bc');
    });

    it('do not add undefined', () => {
        const searchTerm = addRegionToSearchTerm('library', undefined);
        expect(searchTerm).toEqual('library');
    });

});

describe('search term interactions with dictionary, location and region', () => {
    it('do not convert, do not add location, do not add region', () => {
        const searchTerm = processSearchTerm('test', 'My Location', undefined);
        expect(searchTerm).toEqual('test');
    });

    it('convert, add location, add region', () => {
        const searchTerm = processSearchTerm('test', 'Vancouver', RegionCode.BC);
        expect(searchTerm).toEqual('test Vancouver bc');
    });
});