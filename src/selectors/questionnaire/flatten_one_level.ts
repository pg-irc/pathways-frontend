import * as R from 'ramda';

export function flattenOneLevel<T>(nestedArray: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<T> {
    const concat = (a: ReadonlyArray<T>, b: ReadonlyArray<T>): ReadonlyArray<T> => R.concat(a, b);
    return R.reduce(concat, [], nestedArray);
}
