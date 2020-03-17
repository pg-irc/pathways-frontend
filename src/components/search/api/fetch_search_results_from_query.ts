// tslint:disable: no-expression-statement
import { ALGOLIA_SEARCH_API_KEY, ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { validateServiceSearchResponse } from '../../../validation/search';
import { LatLong } from '../../../validation/latlong/types';
import { SearchServiceData } from '../../../validation/search/types';

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

export const fetchSearchResultsFromQuery = async (searchTerm: string, latLong: LatLong): Promise<ReadonlyArray<SearchServiceData>> => {
    if (!searchTerm) {
        return [];
    }
    try {
        const response = await fetch(`https://MMYH1Z0D3O-dsn.algolia.net/1/indexes/${ALGOLIA_SERVICES_INDEX}/query`, {
            'method': 'POST',
            headers: {
                'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
                'Content-Type': 'application/json',
                'X-Algolia-Application-Id': 'MMYH1Z0D3O',
            },
            body: JSON.stringify({
                query: searchTerm,
                hitsPerPage: '20',
                aroundLatLng: latLong ? toAlgoliaParameter(latLong) : '',
            }),
        });

        const responseJSON: AlgoliaResponse = await response.json();
        return validateServiceSearchResponse(responseJSON.hits);
    } catch (Error) {
        return [];
    }
};

const toAlgoliaParameter = (latlong: LatLong): string => (
    `${latlong.lat},${latlong.lng}`
);