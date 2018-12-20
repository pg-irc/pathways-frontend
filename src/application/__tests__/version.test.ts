// tslint:disable:no-expression-statement no-string-literal no-let
import { readFileSync } from 'fs';

describe('version id in VERSION.txt', () => {
    let version = '';
    beforeEach(() => {
        version = readFileSync('VERSION.txt').toString().trim();
    });

    it('matches with version id in app.json', () => {

        const filename = 'app.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);

        expect(json['expo']['version']).toBe(version);
    });

    it('matches with version id in package.json', () => {

        const filename = 'package.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);

        expect(json['version']).toBe(version);
    });
});
