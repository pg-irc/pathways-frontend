import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_SEARCH_API_KEY } from 'react-native-dotenv';
import { QueryParameters, MultiResponse, Response } from 'algoliasearch';

// tslint:disable-next-line: readonly-array
export type AlgoliaRequests = Array<AlgoliaRequest>;

export interface AlgoliaRequest {
    readonly indexName: string;
    readonly query: string;
    readonly params: QueryParameters;
}

export const searchClient = {
    search(requests: AlgoliaRequests): Promise<MultiResponse<Response>> {
        if (!validRequests(requests)) {
          return emptyResponses(requests);
        }
        return algoliaClient.search(requests);
    },
};

const algoliaClient = algoliasearch(
    'MMYH1Z0D3O',
    ALGOLIA_SEARCH_API_KEY,
);

const validRequests = (requests: AlgoliaRequests): boolean => (
    requests.every(hasSearchQuery)
);

const hasSearchQuery = (request: AlgoliaRequest): boolean => (
    request.params.query.length > 0
);

const emptyResponses = (requests: AlgoliaRequests): Promise<MultiResponse<Response>> => (
    Promise.resolve({
        results: requests.map(() => (emptyResponse)),
    })
);

const emptyResponse: Response = {
    hits: [],
    page: 0,
    nbHits: 0,
    nbPages: 0,
    hitsPerPage: 0,
    processingTimeMS: 0,
    query: '',
    params: '',
    exhaustiveNbHits: false,
    exhaustiveFacetsCount: false,
};