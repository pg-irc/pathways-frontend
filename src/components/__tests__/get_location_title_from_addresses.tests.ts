// tslint:disable:no-expression-statement no-let no-class readonly-keyword no-this

import { aNumber, aString } from '../../helpers/random_test_values';
import { Address } from '../../validation/services/types';
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';

class AddressBuilder {
    id: number = aNumber();
    type: string = aString();
    address: string = aString();
    city: string = aString();
    stateProvince: string = aString();
    postalCode: string = aString();
    country: string = aString();

    withAddress(address: string): AddressBuilder {
        this.address = address;
        return this;
    }

    build(): Address {
        return {
            id: this.id,
            type: this.type,
            address: this.address,
            city: this.city,
            stateProvince: this.stateProvince,
            postalCode: this.postalCode,
            country: this.country,
        };
    }
}

describe('getLocationTitleFromAddresses', () => {
    it('returns undefined when called with zero elements', () => {
        expect(getLocationTitleFromAddresses([])).toBeUndefined();
    });

    it('returns undefined when called with two elements', () => {
        const address1 = new AddressBuilder().build();
        const address2 = new AddressBuilder().build();
        expect(getLocationTitleFromAddresses([address1, address2])).toBeUndefined();
    });

    it('returns the address line when called with one element', () => {
        const address = new AddressBuilder().build();

        expect(getLocationTitleFromAddresses([address])).toBe(address.address);
    });

    it('returns undefined when called with an address with "n/a" for address line', () => {
        const address = new AddressBuilder().withAddress('n/a').build();
        expect(getLocationTitleFromAddresses([address])).toBeUndefined();
    });

    it('returns the address with trailing suite number when called with leading suite number', () => {
        const addressLine = '200-250 West Pender Street';
        const expectedResult = '250 West Pender Street, Suite 200';
        const address = new AddressBuilder().withAddress(addressLine).build();
        expect(getLocationTitleFromAddresses([address])).toBe(expectedResult);
    });
});
