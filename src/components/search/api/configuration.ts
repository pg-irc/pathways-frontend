// tslint:disable:no-expression-statement
import { LatLong } from '../types';

export const toServiceSearchConfiguration = (latlong?: LatLong): Object => {
    const latLongArgument = latlong ? { aroundLatLng: toAlgoliaParameter(latlong) } : {};
    return {
        hitsPerPage: 5,
        ...latLongArgument,
    };
};

export const toAlgoliaParameter = (latlong: LatLong): string => (
    `${latlong.latitude},${latlong.longitude}`
);
