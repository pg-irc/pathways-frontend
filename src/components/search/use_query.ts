// tslint:disable: no-expression-statement
import { useLocation } from 'react-router-native';
import { NonSerializedFeedbackState } from '../application/routing';

// TODO Replace with a third party library once we start supporting other types.
function parseSearch(search: string): NonSerializedFeedbackState {
    const normalizedSearch = search.replace('?', '');
    const result: Record<string, string> = {};
    const records = normalizedSearch.split('&');

    for (const record of records) {
        const [key, value]: readonly string[] = record.split('=');
        const resultKey = key === 'serializedFeedback' ? 'feedback' : key;
        try {
            result[resultKey] = JSON.parse(decodeURIComponent(value));
        } catch (error) {
            result[resultKey] = value;
        }
    }

    return result;
}

export const useQuery = (): NonSerializedFeedbackState => {
    const location = useLocation();
    return parseSearch(location.search);
};
