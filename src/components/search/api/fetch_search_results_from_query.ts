// tslint:disable: no-expression-statement
import { ALGOLIA_SEARCH_API_KEY, ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { validateServiceSearchResponse } from '../../../validation/search';
import { LatLong } from '../../../validation/latlong/types';
import { SearchServiceData } from '../../../validation/search/types';
import { ALGOLIA_APPLICATION_ID } from 'react-native-dotenv';
import BuildUrl from 'build-url';
import { searchDictionary } from '../search_dictionary';
import { RegionCode } from '../../../validation/region/types';

export interface AlgoliaResponse {
    readonly exhaustiveNbHits: boolean;
    // tslint:disable-next-line: no-any
    readonly hits: ReadonlyArray<any>;
    readonly hitsPerPage: number;
    readonly nbHits: number;
    readonly nbPages: number;
    readonly page: number;
    readonly params: string;
    readonly processingTimesMs: number;
    readonly query: string;
}

export const fetchSearchResultsFromQuery = async (
    query: string, searchPage: number, latLong: LatLong,
    setNumberOfPages: (n: number) => void): Promise<ReadonlyArray<SearchServiceData>> => {
    if (!query) {
        return [];
    }
    const url = buildAlgoliaSearchUrl();
    const algoliaQuery = JSON.stringify({
        query,
        page: searchPage,
        hitsPerPage: '20',
        aroundLatLng: latLong ? toAlgoliaParameter(latLong) : '',
        aroundPrecision: latLong ? 5000 : '',
    });

    try {
        const response = await fetch(url, buildAlgoliaRequest(algoliaQuery));
        const responseJSON: AlgoliaResponse = await response.json();
        setNumberOfPages(responseJSON.nbPages);
        return validateServiceSearchResponse(responseJSON.hits);
    } catch (Error) {
        return [];
    }
};

export const processSearchTerm = (searchTerm: string, location: string, region: RegionCode): string => {
    if (searchTerm === '') {
        return '';
    }
    const cleanedSearchTerm = searchTerm.toLocaleLowerCase().trim();
    const convertedSearchTerm = checkDictionary(cleanedSearchTerm);
    const searchTermWithLocation = addLocationToSearchTerm(convertedSearchTerm, location);
    const searchTermWithRegion = addRegionToSearchTerm(searchTermWithLocation, region);
    return searchTermWithRegion;
};

export const checkDictionary = (searchTerm: string): string => {
    const needConvert = searchDictionary.has(searchTerm);
    if (needConvert) {
        return searchDictionary.get(searchTerm);
    }
    return searchTerm;
};

export const addLocationToSearchTerm = (searchTerm: string, location: string): string => {
    const customLatLongRegex = '.*\\d.*';
    if (!location) {
        return searchTerm;
    }
    if (location.match(customLatLongRegex) || location.match('My Location')) {
        return searchTerm;
    }
    return searchTerm + ' ' + location;
};

export const addRegionToSearchTerm = (searchTerm: string, region: RegionCode): string => {
    if (region) {
        return searchTerm + ' ' + region;
    }
    return searchTerm;
};

export const fetchServicesForOrganization = async (
    organizationId: string): Promise<AlgoliaResponse> => {
    if (!organizationId) {
        return undefined;
    }
    const algoliaQuery = JSON.stringify({
        query: organizationId,
        typoTolerance: false,
    });

    const url = buildAlgoliaSearchUrl();
    try {
        const response = await fetch(url, buildAlgoliaRequest(algoliaQuery));

        const responseJSON: AlgoliaResponse = await response.json();
        return responseJSON;
    } catch (Error) {
        return undefined;
    }
};

const buildAlgoliaRequest = (algoliaQuery: string): RequestInit => {
    return {
        method: 'POST',
        headers: {
            'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': ALGOLIA_APPLICATION_ID,
        },
        body: algoliaQuery,
    };
};

const buildAlgoliaSearchUrl = (): string => (
    BuildUrl(`https://${ALGOLIA_APPLICATION_ID}-dsn.algolia.net/`, {
        path: `1/indexes/${ALGOLIA_SERVICES_INDEX}/query`,
    })
);

const toAlgoliaParameter = (latlong: LatLong): string => (
    `${latlong.lat},${latlong.lng}`
);
