import { Service } from '../../stores/services';

export interface TaskServices {
    readonly loading: boolean;
    readonly message: string;
    readonly services: ReadonlyArray<Service>;
}
