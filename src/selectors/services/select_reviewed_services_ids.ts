import { Store } from '../../stores';
import { Id } from '../../stores/services';
import { selectReviewedServiceMap } from './select_reviewed_service_map';

export const selectReviewedServicesIds = (appStore: Store): ReadonlyArray<Id> => (
    Object.keys(selectReviewedServiceMap(appStore))
);