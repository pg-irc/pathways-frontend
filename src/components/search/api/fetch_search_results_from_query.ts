// tslint:disable: no-expression-statement
import BuildUrl from 'build-url';;
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { validateServiceSearchResponse } from '../../../validation/search';

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

export const fetchSearchResultsFromQuery = async (searchTerm: string): Promise<any> => {
    const url = buildAlgoliaSearchUrl();
    const response = await fetch(url, {
        'method': 'POST',
        headers: {
            'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': 'MMYH1Z0D3O',
        },
        body: JSON.stringify({
            query: searchTerm,
            hitsPerPage: '20',
        }),
    })
    const responseJSON: AlgoliaResponse = await response.json();

    const responseHits = validateServiceSearchResponse(responseJSON.hits);
    return responseHits;
};

const buildAlgoliaSearchUrl = (): string => (
    BuildUrl('https://MMYH1Z0D3O-dsn.algolia.net/1/indexes/dev_phones/query')
);