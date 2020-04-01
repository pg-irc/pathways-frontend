export interface LatLong {
    readonly lat: number;
    readonly lng: number;
}

export interface UserLocation {
    readonly label: string;
    readonly latLong: LatLong;
}
