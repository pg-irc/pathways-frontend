import * as R from 'ramda';

export function flattenOneLevel<T>(nestedArray: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<T> {
    const reducer = (acc: ReadonlyArray<T>, val: ReadonlyArray<T>): ReadonlyArray<T> => R.concat(acc, val);
    return R.reduce(reducer, [], nestedArray);
}
