// tslint:disable:no-var-requires no-expression-statement
const Ajv = require('ajv');
import { openURL } from '../link/link';
import { History } from 'history';
import * as R from 'ramda';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';

// tslint:disable-next-line:no-any
export const notificationListener = R.curry((history: History, notification: any): void => {
    const route = getValidRouteFromNotificationPayload(notification);
    if (!route) {
        return;
    }
    if (route === 'store') {
        const playStoreUrl = 'market://details?id=org.peacegeeks.ArrivalAdvisor';
        openURL(playStoreUrl);
    } else if (route === 'welcome') {
        goToRouteWithoutParameter(Routes.Welcome, history)();
    } else if (route.startsWith('/task')) {
        history.push(route);
    }
});

// tslint:disable-next-line:no-any
const getValidRouteFromNotificationPayload = (data: any): string | undefined => {
    const ajv = new Ajv();
    const isValid = ajv.validate(notificationPayloadSchema, data) as boolean;

    if (!isValid) {
        return undefined;
    }

    // tslint:disable-next-line:no-string-literal
    const url = data['data']['navigateToRoute'];

    const validTopicUrlRegEx = /^\/task\/[a-z0-9\-]+$/;
    if (url === 'store' || url === 'welcome' || validTopicUrlRegEx.test(url)) {
        return url;
    }

    return undefined;
};

const notificationPayloadSchema = {
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
