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

export function anError(): Error {
    return new Error(aString());
}