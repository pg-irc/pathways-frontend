// tslint:disable:no-var-requires no-any
import * as R from 'ramda';
import * as types from './types';
import { serviceAtLocationArray } from './schema';
import { ValidationResult } from '../validation_result';
import { Id } from '../../stores/services';
const Ajv = require('ajv');

export const validateServicesAtLocationArray = (data: ReadonlyArray<any>): ValidationResult<ValidatedServiceAtLocationJSON> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceAtLocationArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

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

export interface ValidatedServiceAtLocationJSON {
    readonly id?: number;
    readonly service: ValidatedServiceJSON;
    readonly location: ValidatedLocationJSON;
}

export const toServicesFromValidatedData = (bookmarkedServiceIds: ReadonlyArray<Id>, data: ReadonlyArray<ValidatedServiceAtLocationJSON>):
    ReadonlyArray<types.HumanServiceData> => (
        R.map(serviceFromData(bookmarkedServiceIds), data)
    );

const serviceFromData = R.curry((bookmarkedServiceIds: ReadonlyArray<Id>, data: ValidatedServiceAtLocationJSON):
    types.HumanServiceData => {
        const phoneNumbers = R.map((phoneNumber: ValidatedPhoneNumberJSON): types.PhoneNumber => ({
            type: phoneNumber.phone_number_type,
            phone_number: phoneNumber.phone_number,
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
            services_at_location_id: data.id,
            latlong: {
                lat: data.location.latitude,
                lng: data.location.longitude,
            },
            name: data.service.name,
            description: data.service.description,
            phoneNumbers: phoneNumbers,
            addresses: addresses,
            website: data.service.organization_url,
            email: data.service.organization_email,
            organizationName: data.service.organization_name,
            bookmarked: R.contains(data.service.id, bookmarkedServiceIds),
        };
});