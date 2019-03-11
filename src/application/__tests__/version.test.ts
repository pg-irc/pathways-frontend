// tslint:disable:no-expression-statement no-string-literal no-let typedef
import { readFileSync, existsSync } from 'fs';

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

    it('matches with version id in .env', () => {

        const filename = '.env';
        if (existsSync(filename)) {
            const content = readFileSync(filename).toString();
            expect(content).toContain(`VERSION=${version}`);
        }
    });

    it('matches with version id environment variable', () => {
        if (process.env.VERSION) {
            expect(process.env.VERSION).toBe(version);
        }
    });

    it('matches with version id in package.json', () => {

        const filename = 'package.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);

        expect(json['version']).toBe(version);
    });

    it('is tracked by android version code', () => {
        const filename = 'app.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);
        const androidVersionCode = json['expo']['android']['versionCode'];
        const versionSplit = version.toString().split('.');
        const code = 10000*Number(versionSplit[0])+100*Number(versionSplit[1])+Number(versionSplit[2]);

        expect(androidVersionCode).toBe(code);
    });
});
