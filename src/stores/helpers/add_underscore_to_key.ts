import { Id } from '../services/types';

export const addUnderscoreToObjectKey = (key: Id): string  => {
    return '_' + key;
};
