import { Address } from '../../validation/services/types';

export const getLocationTitleFromAddresses = (addresses: ReadonlyArray<Address>): string => {
    if (addresses.length !== 1) {
        return undefined;
    }
    const addressLine = addresses[0].address;
    if (addressLine === 'n/a') {
        return undefined;
    }
    const addressWithLeadingSuiteNumber = /^(\d+)\-(\d.+)$/;
    const match = addressWithLeadingSuiteNumber.exec(addressLine);
    if (match) {
        return `${match[2]}, Suite ${match[1]}`;
    }
    return addressLine;
};
