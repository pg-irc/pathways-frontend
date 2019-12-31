// tslint:disable:no-expression-statement
import { LatLong } from '../../../validation/latlong/types';

export const toServiceSearchConfiguration = (latlong?: LatLong): Object => {
    const latLongArgument = latlong ? { aroundLatLng: toAlgoliaParameter(latlong) } : {};
    return {
        hitsPerPage: 20,
        ...latLongArgument,
    };
};

export const toAlgoliaParameter = (latlong: LatLong): string => (
    `${latlong.lat},${latlong.lng}`
);
