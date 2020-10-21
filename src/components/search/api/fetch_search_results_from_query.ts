// tslint:disable: no-expression-statement
import { ALGOLIA_SEARCH_API_KEY, ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { validateServiceSearchResponse } from '../../../validation/search';
import { LatLong } from '../../../validation/latlong/types';
import { SearchServiceData } from '../../../validation/search/types';
import { ALGOLIA_APPLICATION_ID } from 'react-native-dotenv';
import BuildUrl from 'build-url';

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
    searchTerm: string, searchPage: number, latLong: LatLong, setNumberOfPages: (n: number) => void): Promise<ReadonlyArray<SearchServiceData>> => {
    if (!searchTerm) {
        return [];
    }
    const url = buildAlgoliaSearchUrl();
    try {
        const response = await fetch(url, {
            'method': 'POST',
            headers: {
                'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
                'Content-Type': 'application/json',
                'X-Algolia-Application-Id': ALGOLIA_APPLICATION_ID,
            },
            body: JSON.stringify({
                query: searchTerm,
                page: searchPage,
                hitsPerPage: '20',
                aroundLatLng: latLong ? toAlgoliaParameter(latLong) : '',
                aroundPrecision: latLong ? 5000 : '',
            }),
        });

        const responseJSON: AlgoliaResponse = await response.json();
        setNumberOfPages(responseJSON.nbPages);
        return validateServiceSearchResponse(responseJSON.hits);
    } catch (Error) {
        return [];
    }
};

export const fetchServicesFromOrganization = async (
    organizationId: string): Promise<ReadonlyArray<SearchServiceData>> => {
    if (!organizationId) {
        return [];
    }
    const url = buildAlgoliaSearchUrl();
    try {
        const response = await fetch(url, {
            'method': 'POST',
            headers: {
                'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
                'Content-Type': 'application/json',
                'X-Algolia-Application-Id': ALGOLIA_APPLICATION_ID,
            },
            body: JSON.stringify({
                query: organizationId,
            }),
        });

        const responseJSON: AlgoliaResponse = await response.json();
        return validateServiceSearchResponse(responseJSON.hits);
    } catch (Error) {
        return [];
    }
};

const buildAlgoliaSearchUrl = (): string => (
    BuildUrl(`https://${ALGOLIA_APPLICATION_ID}-dsn.algolia.net/`, {
        path: `1/indexes/${ALGOLIA_SERVICES_INDEX}/query`,
    })
);

const toAlgoliaParameter = (latlong: LatLong): string => (
    `${latlong.lat},${latlong.lng}`
);
