import { PhoneNumber } from '../../stores/services/types';

export interface Service {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
}
