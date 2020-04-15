import * as uuid from 'uuid';

export const aNumber = (): number => {
    // limit the range so we can reasonably use the returned
    // values as the number of objects to create in tests
    return 50 * Math.random();
};

export const anInteger = (): number => {
    return Math.floor(aNumber());
};

export const aString = (): string => {
    return uuid.v4();
};

export const aBoolean = (): boolean => {
    return Math.random() > 0.5;
};

export const aDate = (): string => {
    const now = Date.now();
    const randomDelta = Math.floor(Math.random() * 1e10);
    return new Date(now - randomDelta).toISOString();
};

export function anError(): Error {
    return new Error(aString());
}