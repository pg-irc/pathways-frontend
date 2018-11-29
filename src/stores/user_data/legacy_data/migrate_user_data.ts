// tslint:disable:no-expression-statement no-parameter-reassignment

import { PersistedUserData as CurrentUserData } from '../types';
import {
    PersistedUserDataVersion1, migrateFromVersion_0_1,
    PersistedUserDataVersion2, migrateFromVersion_0_2,
} from './legacy_types';

export type LegacyUserData = CurrentUserData
    | PersistedUserDataVersion1
    | PersistedUserDataVersion2
    ;

export const migrateUserData = (userData: LegacyUserData): CurrentUserData => {
    if (userData.version === 'version 0.1') {
        userData = migrateFromVersion_0_1(userData);
    }
    if (userData.version === 'version 0.2') {
        userData = migrateFromVersion_0_2(userData);
    }
    return userData;
};
