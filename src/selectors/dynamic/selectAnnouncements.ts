import { Store } from '../../stores';
import { Announcement } from '../../stores/announcements';

export const selectAnnoucements = (appStore: Store): ReadonlyArray<Announcement> => {
    return appStore.announcements.announcements;
};
