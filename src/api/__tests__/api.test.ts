// tslint:disable:no-expression-statement
import { aString, aNumber } from '../../application/__tests__/helpers/random_test_values';
import { Location } from 'expo';
import { API } from '..';

describe('build parameters', () => {
    it('with just a task id', () => {
        const taskId = aString();
        const result = API.buildParameters(taskId, undefined);
        expect(result).toEqual(`related_to_task=${taskId}`);
    });

    it('with a task id and location', () => {
        const taskId = aString();
        const x = aNumber();
        const y = aNumber();
        const location = makeLocation(x, y);
        const result = API.buildParameters(taskId, location);
        expect(result).toEqual(`related_to_task=${taskId}&user_location=${x}%2C${y}`);
    });
});

const makeLocation = (x: number, y: number): Location.LocationData => ({
    coords: {
        longitude: x,
        latitude: y,
        heading: aNumber(),
        speed: aNumber(),
        altitude: aNumber(),
        accuracy: aNumber(),
    },
    timestamp: aNumber(),
});
