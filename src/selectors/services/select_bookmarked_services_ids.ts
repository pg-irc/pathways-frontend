import { Store } from '../../stores';
import { selectBookmarkedServiceMap } from './select_bookmarked_service_map';
import { Id } from '../../stores/services';

export const selectBookmarkedServicesIds = (appStore: Store): ReadonlyArray<Id> => (
    Object.keys(selectBookmarkedServiceMap(appStore))
);