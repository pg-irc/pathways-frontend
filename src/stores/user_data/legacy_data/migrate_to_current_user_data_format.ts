// tslint:disable:no-expression-statement no-parameter-reassignment

import { PersistedUserData as CurrentUserData } from '../types';
import {
    PersistedUserData_v0_1, migrateFrom_v0_1,
    PersistedUserData_v0_2, migrateFrom_v0_2,
} from './legacy_types';

export type VersionedUserData = CurrentUserData
    | PersistedUserData_v0_1
    | PersistedUserData_v0_2
    ;

export const migrateToCurrentUserDataFormat = (userData: VersionedUserData): CurrentUserData => {
    if (userData.version === 'version 0.1') {
        userData = migrateFrom_v0_1(userData);
    }
    if (userData.version === 'version 0.2') {
        userData = migrateFrom_v0_2(userData);
    }
    return userData;
};
