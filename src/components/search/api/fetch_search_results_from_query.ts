// tslint:disable: no-expression-statement
import BuildUrl from 'build-url';;
import { SetHits } from '../search_component';

export const fetchSearchResultsFromQuery = (searchTerm: string, setHits: SetHits): void => {
    const url = buildAlgoliaSearchUrl();
    fetch(url, {
        'method': 'POST',
        headers: {
            'X-Algolia-API-Key': '2ccc9aae1b8184fa912795078f8727f5',
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': 'MMYH1Z0D3O',
        },
        body: JSON.stringify({
            query: searchTerm,
            hitsPerPage: '5',
        }),
    }).
    then((data) => data.json()).
    then((dataJSON) => setHits(dataJSON.hits));
};

const buildAlgoliaSearchUrl = (): string => (
    BuildUrl('https://MMYH1Z0D3O-dsn.algolia.net/1/indexes/dev_phones/query')
);