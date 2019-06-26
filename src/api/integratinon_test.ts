// tslint:disable:no-expression-statement no-let

import { setUrl, searchServices } from '.';

let host: string = undefined;
let topicId: string = undefined;
let latitude: number = undefined;
let longitude: number = undefined;

// tslint:disable-next-line:no-shadowed-variable
const buildLocationData = (latitude: number, longitude: number): LocationData => {
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
        } else {
            console.log('Help message');
        }
    }
};

parseArguments(process.argv);
validateArguments();
setUrl(host);
const location = buildLocationData(latitude, longitude);
searchServices(topicId, location).then((_result: object): void => { });
