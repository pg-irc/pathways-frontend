// tslint:disable:no-var-requires no-expression-statement
const Ajv = require('ajv');
import { openURL } from '../link/link';
import { History } from 'history';
import * as R from 'ramda';

// tslint:disable-next-line:no-any
export const notificationListener = R.curry((history: History, notification: any): void => {
    const validUrl = validateUrl(notification);
    if (!validUrl) {
        return;
    }
    if (validUrl === 'store') {
        const playStoreUrl = 'market://details?id=org.peacegeeks.ArrivalAdvisor';
        openURL(playStoreUrl);
    } else {
        history.push(validUrl);
    }
});

// tslint:disable-next-line:no-any
const validateUrl = (data: any): string | undefined => {
    const ajv = new Ajv();
    const isValid = ajv.validate(notificationSchema, data) as boolean;

    if (!isValid) {
        return undefined;
    }

    // tslint:disable-next-line:no-string-literal
    const url = data['data']['navigateToRoute'];
    const validTopicUrlRegEx = /^\/task\/[a-z0-9\-]+$/;

    if (url === 'store' || validTopicUrlRegEx.test(url)) {
        return url;
    }

    return undefined;
};

const notificationSchema = {
    'type': 'object',
    'properties': {
        'data': {
            'type': 'object',
            'properties': {
                'navigateToRoute': {
                    'type': 'string',
                },
            },
        },
    },
};
