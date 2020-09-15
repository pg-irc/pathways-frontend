export interface LatLong {
    readonly lat: number;
    readonly lng: number;
}

export interface UserLocation {
    readonly humanReadableLocation: string;
    readonly latLong: LatLong;
}
