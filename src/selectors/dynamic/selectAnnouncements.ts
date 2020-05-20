import { Store } from '../../stores';
import { Announcement } from '../../validation/announcements/types';

export const selectAnnoucements = (appStore: Store): ReadonlyArray<Announcement> => {
    return appStore.announcements.announcements;
};
