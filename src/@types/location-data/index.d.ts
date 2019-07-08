// After upgrading Expo to 32.0.0 importing Location and referencing
// Location.LocationData no longer works due to the conflicts in @types/expo and the
// definition coming from 'expo-location'. This was copied from expo-location/build/Location.d.ts.
declare interface LocationData {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number;
        accuracy: number;
        heading: number;
        speed: number;
    };
    timestamp: number;
}