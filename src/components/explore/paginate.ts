import * as R from 'ramda';

export const paginate = <T>(pageSize: number, items: ReadonlyArray<T>): ReadonlyArray<ReadonlyArray<T>> => {
    if (items.length === 0) {
        return [];
    }
    return [R.take(pageSize, items), ...paginate(pageSize, R.drop(pageSize, items))];
};
