import { Errors } from './types';

export const getSentryMessageForError = (errorType: Errors, context: string): string => {
    switch (errorType) {
        case Errors.Offline:
            return `${context}: Can't reach the internet`;
        case Errors.NoLocationPermission:
            return `${context}: Enable location services`;
        case Errors.LocationFetchTimeout:
            return `${context}: Check location services`;
        case Errors.InvalidServerData:
        case Errors.BadServerResponse:
            return `${context}: Server error`;
        default:
            return `${context}: An error occurred.`;
    }
};