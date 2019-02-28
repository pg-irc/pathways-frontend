import { Service } from '../../stores/services';

export interface TaskServices {
    readonly loading: boolean;
    readonly services: ReadonlyArray<Service>;
}
