import { Address } from '../../stores/services';

export const getLocationTitleFromAddresses = (addresses: ReadonlyArray<Address>): string => {
    if (addresses.length !== 1) {
        return undefined;
    }
    return addresses[0].address === 'n/a' ? undefined : addresses[0].address;
};
