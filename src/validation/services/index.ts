// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

import * as R from 'ramda';
import * as types from './types';
import { serviceAtLocationArray } from './schema';

// tslint:disable-next-line:no-any
export const validateServicesAtLocationArray = (data: any): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceAtLocationArray, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

export interface ValidationResult {
    readonly isValid: boolean;
    readonly errors?: string;
}

interface ValidatedPhoneNumberJSON {
    readonly phone_number_type: string;
    readonly phone_number: string;
}

interface ValidatedAddressJSON {
    readonly id: number;
    readonly address: string;
    readonly city: string;
    readonly state_province: string;
    readonly postal_code: string;
    readonly country: string;
}

interface ValidatedAddressWithTypeJSON {
    readonly address_type: string;
    readonly address: ValidatedAddressJSON;
}

interface ValidatedServiceJSON {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly organization_url: string;
    readonly organization_email: string;
    readonly organization_name: string;
}

interface ValidatedLocationJSON {
    readonly latitude?: number;
    readonly longitude?: number;
    readonly phone_numbers: ReadonlyArray<ValidatedPhoneNumberJSON>;
    readonly addresses: ReadonlyArray<ValidatedAddressWithTypeJSON>;
}

interface ValidatedServiceAtLocationJSON {
    readonly service: ValidatedServiceJSON;
    readonly location: ValidatedLocationJSON;
}

export const serviceFromValidatedJSON = (data: ValidatedServiceAtLocationJSON): types.Service => {
    const phoneNumbers = R.map((phoneNumber: ValidatedPhoneNumberJSON): types.PhoneNumber => ({
        type: phoneNumber.phone_number_type,
        phoneNumber: phoneNumber.phone_number,
    }), data.location.phone_numbers);

    const addresses = R.map((addressWithType: ValidatedAddressWithTypeJSON): types.Address => ({
        id: addressWithType.address.id,
        type: addressWithType.address_type,
        address: addressWithType.address.address,
        city: addressWithType.address.city,
        stateProvince: addressWithType.address.state_province,
        postalCode: addressWithType.address.postal_code,
        country: addressWithType.address.country,
    }), data.location.addresses);

    return {
        id: data.service.id,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        name: data.service.name,
        description: data.service.description,
        phoneNumbers: phoneNumbers,
        addresses: addresses,
        website: data.service.organization_url,
        email: data.service.organization_email,
        organizationName: data.service.organization_name,
    };
};
