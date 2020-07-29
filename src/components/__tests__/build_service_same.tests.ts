// tslint:disable: no-expression-statement typedef
import { aString } from '../../application/helpers/random_test_values';
import { buildServiceName } from '../services/build_service_name';

describe('getLocationTitleFromAddresses', () => {
    it('returns organization and service name when they differ', () => {
        const organizationName = aString();
        const serviceName = aString();
        const expected = `${organizationName} - ${serviceName}`;
        expect(buildServiceName(organizationName, serviceName)).toBe(expected);
    });
    it('returns just service name when they are the same', () => {
        const serviceName = aString();
        const organizationName = serviceName;
        expect(buildServiceName(organizationName, serviceName)).toBe(serviceName);
    });
});
