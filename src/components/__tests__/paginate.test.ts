// tslint:disable:no-let
// tslint:disable:no-expression-statement
import { paginate } from '../explore/paginate';

describe('paginate function', () => {
    let input: ReadonlyArray<number> = undefined;
    let expected: ReadonlyArray<ReadonlyArray<number>> = undefined;
    const pageSize = 2;

    it('returns empty array when called with empty array', () => {
        input = [];
        expected = [];
        expect(paginate(pageSize, input)).toEqual(expected);
    });
    it('returns one page when number of elements is less than page size', () => {
        input = [1];
        expected = [[1]];
        expect(paginate(pageSize, input)).toEqual(expected);
    });
    it('returns one page when number of elements is equal to page size', () => {
        input = [1, 2];
        expected = [[1, 2]];
        expect(paginate(pageSize, input)).toEqual(expected);
    });
    it('returns two pages when number of elements is one greater than page size', () => {
        input = [1, 2, 3];
        expected = [[1, 2], [3]];
        expect(paginate(pageSize, input)).toEqual(expected);
    });
    it('returns multiple pages when number of elements are greater than page size', () => {
        input = [1, 2, 3, 4, 5];
        expected = [[1, 2], [3, 4], [5]];
        expect(paginate(pageSize, input)).toEqual(expected);
    });
    it('works with any type', () => {
        const inputStrings: ReadonlyArray<string> = ['a'];
        const expectedStrings: ReadonlyArray<ReadonlyArray<string>> = [['a']];
        expect(paginate(pageSize, inputStrings)).toEqual(expectedStrings);
    });
});
