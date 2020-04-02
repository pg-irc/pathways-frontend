// tslint:disable: no-expression-statement
import { useLocation } from 'react-router-native';
import { ParsedQueryParameters } from '../application/routing';

// TODO Replace with a third party library once we start supporting other types.
function parseSearch(search: string): ParsedQueryParameters {
    const normalizedSearch = search.replace('?', '');
    const result: Record<string, string> = {};
    const records = normalizedSearch.split('&');

    for (const record of records) {
        const [key, value]: readonly string[] = record.split('=');
        try {
            result[key] = JSON.parse(decodeURIComponent(value));
        } catch (error) {
            result[key] = value;
        }
    }

    return result;
}

export const useQuery = (): ParsedQueryParameters => {
    const location = useLocation();
    return parseSearch(location.search);
};