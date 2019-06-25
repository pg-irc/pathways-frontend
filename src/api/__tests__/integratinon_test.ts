#!/usr/bin/node
// tslint:disable:no-expression-statement no-let

import { setUrl, searchServices } from '..';

let host = '';
let topicId = '';
let theFooLocation: LocationData = undefined;

const parseLocation = (locationString: string): LocationData => {
    const substrings = locationString.split(',');
    const latitude = parseFloat(substrings[0]);
    const longitude = parseFloat(substrings[1]);
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

const validateArguments = (theHost: string, theTopicId: string, theLocation: LocationData): void => {
    if (theHost.length === 0) {
        throw new Error('Invalid host name');
    }
    if (theTopicId.length === 0) {
        throw new Error('Invalid topic id');
    }
    if (theLocation.coords.latitude < theLocation.coords.longitude) {
        throw new Error('Invalid lat/long, are they backwards?');
    }
};

for (let i = 0; i < process.argv.length; i++) {
    const element = process.argv[i];
    if (element === '--host') {
        i++;
        host = process.argv[i];
    } else if (element === '--location') {
        i++;
        theFooLocation = parseLocation(process.argv[i]);
    } else if (element === '--topicId') {
        i++;
        topicId = process.argv[i];
    } else {
        console.log('Help message');
    }
}

validateArguments(host, topicId, theFooLocation);

setUrl(host);

searchServices(topicId, theFooLocation).then((_result: object): void => { });
