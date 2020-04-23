// tslint:disable: no-expression-statement
import { useLocation } from 'react-router-native';

// TODO Replace with a third party library once we start supporting other types.
function parseSearch(search: string): Record<string, string> {
    const normalizedSearch = search.replace('?', '');
    const result: Record<string, string> = {};
    const records = normalizedSearch.split('&');

    for (const record of records) {
        const [key, value]: readonly string[] = record.split('=');
        result[key] = value;
    }

    return result;
}

export const useQuery = (): Record<string, string> => {
    const location = useLocation();
    return parseSearch(location.search);
};