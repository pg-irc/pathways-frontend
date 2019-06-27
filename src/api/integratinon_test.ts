// tslint:disable:no-expression-statement no-let

// to run:
// yarn build && yarn run ts-node src/api/integratinon_test.ts --host <hostname> --topic <topicId> --latitude <lat> --longitude <long>

import { setUrl, searchServices, APIResponse } from '.';

let host: string = undefined;
let topicId: string = undefined;
let latitude: number = undefined;
let longitude: number = undefined;

const parseArguments = (args: ReadonlyArray<string>): void => {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        if (element === '--host') {
            i++;
            host = args[i];
        } else if (element === '--topic') {
            i++;
            topicId = args[i];
        } else if (element === '--latitude') {
            i++;
            latitude = parseFloat(args[i]);
        } else if (element === '--longitude') {
            i++;
            longitude = parseFloat(args[i]);
        }
    }
};

const validateArguments = (): void => {
    if (!host || host.length === 0) {
        throw new Error('Invalid host name');
    }
    if (!topicId || topicId.length === 0) {
        throw new Error('Invalid topic id');
    }
    if (!latitude || !longitude || latitude < longitude) {
        throw new Error('Invalid lat/long');
    }
};

const buildLocationData = (): LocationData => {
    return {
        coords: {
            latitude,
            longitude,
            altitude: 0,
            accuracy: 0,
            heading: 0,
            speed: 0,
        },
        timestamp: 0,
    };
};

parseArguments(process.argv);

validateArguments();

setUrl(host);

const location = buildLocationData();

searchServices(topicId, location).
    then((result: APIResponse): void => {
        const text = result ? result.message : 'Error from then';
        console.log('OK in bar ' + text);
    }).catch((error: object): void => {
        const text = error ? JSON.stringify(error) : 'Error from catch';
        console.log('Error in bar ' + text);
    });
