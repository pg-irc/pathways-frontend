import { createPushNotificationTokenUrl } from '../../api';

// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-var-requires
const BuildUrl = require('build-url');

describe('BuildUrl third party library function', () => {

    const url = 'http://example.com';

    test('with just the url', () => {
        expect(BuildUrl(url)).toEqual('http://example.com');
    });

    test('with path', () => {
        expect(BuildUrl(url, { path: 'foo' })).toEqual('http://example.com/foo');
    });

    test('with path and hash', () => {
        expect(BuildUrl(url, { path: 'foo', hash: 'bar' })).toEqual('http://example.com/foo#bar');
    });

    test('with array for path', () => {
        expect(BuildUrl(url, { path: ['foo', 'bar'] })).toEqual('http://example.com/foo,bar');
    });

    test('with path containing slash', () => {
        expect(BuildUrl(url, { path: ['foo/bar'] })).toEqual('http://example.com/foo/bar');
    });

    test('with empty query parameters', () => {
        expect(BuildUrl(url, { path: 'foo', queryParams: {} })).toEqual('http://example.com/foo?');
    });

    test('with one query parameter', () => {
        expect(BuildUrl(url, { path: 'foo', queryParams: { bar: '123' } })).toEqual('http://example.com/foo?bar=123');
    });

    test('with everything', () => {
        const parameters = {
            path: 'foo/bar',
            hash: 'baz',
            queryParams: {
                fuz: '123',
            },
        };
        expect(BuildUrl(url, parameters)).toEqual('http://example.com/foo/bar?fuz=123#baz');
    });
});

describe('token endpoint', () => {
    test('url contains token', () => {
        const url = 'http://example.com';
        expect(createPushNotificationTokenUrl(url)).toEqual('http://example.com/v1/push_notifications/tokens/');
    });
});
