// tslint:disable:no-expression-statement
import { buildParameters } from '..';
import { aString, aNumber } from '../../application/random_test_values';

describe('build parameters', () => {
    it('with just a topic id', () => {
        const topicId = aString();
        const result = buildParameters(topicId, undefined);
        expect(result).toEqual({
            related_to_topic: `${topicId}`,
            per_page: '100',
        });
    });

    it('with a topic id and location', () => {
        const topicId = aString();
        const x = aNumber();
        const y = aNumber();
        const location = makeLocation(x, y);
        const result = buildParameters(topicId, location);
        expect(result).toEqual({
            proximity: `${x},${y}`,
            related_to_topic: topicId,
            user_location: `${x},${y}`,
            per_page: '100',
        });
    });
});

const makeLocation = (x: number, y: number): DeviceLocationData => ({
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
