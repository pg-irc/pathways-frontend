// tslint:disable:no-expression-statement
import { toGeoCoderLatLong } from '..';

describe('GeoCoder response validation', () => {
    describe('with valid data', () => {
        it('returns lat long', () => {
            const result = toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                'longt': '-117.795094',
                'postal': 'V0G1R0',
                'latt': '50.237690',
            });
            expect(result.lat).toEqual(50.237690);
            expect(result.lng).toEqual(-117.795094);
        });
    });
    describe('with invalid data', () => {
        it('throws on missing field', () => {
            expect(() => toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                // 'longt': '-117.795094',
                'postal': 'V0G1R0',
                'latt': '50.237690',
            })).toThrowError('longt');
        });

        it('throws on field of wrong type', () => {
            expect(() => toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                'longt': '-117.795094',
                'latt': 'not a valid number',
                'postal': 'V0G1R0',
            })).toThrow('latt');
        });
    });
});
