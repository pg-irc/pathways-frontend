import * as R from 'ramda';

export const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));