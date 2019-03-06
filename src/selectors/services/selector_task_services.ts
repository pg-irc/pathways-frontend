import { Service } from '../../stores/services';

export interface SelectorTaskServices {
    readonly loading: boolean;
    readonly services: ReadonlyArray<Service>;
}
