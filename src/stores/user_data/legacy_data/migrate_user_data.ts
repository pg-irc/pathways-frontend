// tslint:disable:no-expression-statement no-parameter-reassignment

import { PersistedUserData as CurrentUserData } from '../types';
import {
    PersistedUserDataVersion1, migrateFromVersion1,
    PersistedUserDataVersion2, migrateFromVersion2,
} from './legacy_types';

export type LegacyUserData = CurrentUserData
    | PersistedUserDataVersion1
    | PersistedUserDataVersion2
    ;

export const migrateUserData = (userData: LegacyUserData): CurrentUserData => {
    if (userData.version === 'version1') {
        userData = migrateFromVersion1(userData);
    }
    if (userData.version === 'version2') {
        userData = migrateFromVersion2(userData);
    }
    return userData;
};
