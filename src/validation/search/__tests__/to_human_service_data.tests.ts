// tslint:disable:no-expression-statement
import { toHumanServiceData } from '../to_human_service_data';
import { aDate, aString, aNumber } from '../../../application/helpers/random_test_values';
import { Id } from '../../services/types';

describe('Adapting search result to service data', () => {
    const emptyBookmarkedServiceIds: ReadonlyArray<Id> = [];
    const emptyReviewedServiceIds: ReadonlyArray<Id> = [];
    describe('with valid data', () => {
        it('returns human service when both latitude and longitude are numbers', () => {
            const latitude = aNumber();
            const longitude = aNumber();
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: latitude,
                    lng: longitude,
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds);
            expect(result.latlong.lat).toEqual(latitude);
            expect(result.latlong.lng).toEqual(longitude);
        });

        it('returns data with phone numbers if present', () => {
            const firstPhoneNumber = aString();
            const secondType = aString();
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                phone_numbers: [{
                    type: aString(),
                    phone_number: firstPhoneNumber,
                }, {
                    type: secondType,
                    phone_number: aString(),
                }],
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds);
            expect(result.phoneNumbers[0].phone_number).toEqual(firstPhoneNumber);
            expect(result.phoneNumbers[1].type).toEqual(secondType);
        });

        it('returns empty array for phone numbers if none are given', () => {
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds);
            expect(result.phoneNumbers).toEqual([]);
        });

        it('human service returns with undefined latlong if latitude and longitude were both empty string', () => {
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: '',
                    lng: '',
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds);
            expect(result.latlong).toEqual(undefined);
        });
    });

    describe('with invalid data', () => {
        it('throws error when latitude type and longitude type do not match', () => {
            expect(() => toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aString(),
                    lng: aNumber(),
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds)).toThrowError('Invalid types for lat/long in search result');
        });

        it('throws error on non empty strings in both latitude and longitude', () => {
            expect(() => toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: 'not an empty string',
                    lng: 'not an empty string',
                },
            }, emptyBookmarkedServiceIds, emptyReviewedServiceIds)).toThrowError('Invalid types for lat/long in search result');
        });
    });

    describe('with populated BookmarkedServicesIds', () => {
        it('returns a saved service with bookmarked set to true', () => {
            const serviceId = aString();
            const bookmarkedServicesIds: ReadonlyArray<Id> = [serviceId];
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, bookmarkedServicesIds, emptyReviewedServiceIds);
            expect(result.bookmarked).toBe(true);
        });

        it('it returns a service not saved with bookmarked set to false', () => {
            const bookmarkedServiceId = aString();
            const bookmarkedServicesIds: ReadonlyArray<Id> = [bookmarkedServiceId];
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, bookmarkedServicesIds, emptyReviewedServiceIds);
            expect(result.bookmarked).toBe(false);
        });
    });




    describe('with populated reviewedServiceIds', () => {
        it('returns a saved service with reviewed set to true', () => {
            const serviceId = aString();
            const reviewedServiceIds: ReadonlyArray<Id> = [serviceId];
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, emptyBookmarkedServiceIds, reviewedServiceIds);
            expect(result.reviewed).toBe(true);
        });

        it('it returns a service not saved with reviewed set to false', () => {
            const bookmarkedServiceId = aString();
            const reviewedServiceIds: ReadonlyArray<Id> = [bookmarkedServiceId];
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                last_verified_date: aDate(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }, emptyBookmarkedServiceIds, reviewedServiceIds);
            expect(result.reviewed).toBe(false);
        });
    });
});
