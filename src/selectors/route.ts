import * as app from '../application/store';
import * as route from '../stores/page_switcher';

export interface Route {
    readonly pageType: route.Page;
    readonly pageId: string;
}

export const selectRoute = (store: app.Store): Route => {
    const { pageType, pageId }: route.Store = store.applicationState.routeInStore;
    return { pageType, pageId };
};
