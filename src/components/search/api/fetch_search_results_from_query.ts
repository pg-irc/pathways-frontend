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
    searchTerm: string, searchPage: number, location: string, latLong: LatLong, region: RegionCode,
    setNumberOfPages: (n: number) => void): Promise<ReadonlyArray<SearchServiceData>> => {
    if (!searchTerm) {
        return [];
    }
    const url = buildAlgoliaSearchUrl();
    const algoliaQuery = JSON.stringify({
        query: processSearchTerm(searchTerm, location, region),
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
    // tslint:disable-next-line: no-let
    let processedSearchTerm = searchTerm.toLocaleLowerCase().trim();

    const needConvert = searchDictionary.has(processedSearchTerm);
    if (needConvert) {
        processedSearchTerm = searchDictionary.get(processedSearchTerm);
    }

    processedSearchTerm += ' ' + region;

    const customLatLongRegex = '.*\\d.*';
    if (location.match(customLatLongRegex) || location.match('My Location')) {
        return processedSearchTerm;
    }

    return processedSearchTerm + ' ' + location;
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
