import * as app from '../application/store';
import * as route from '../stores/page_switcher';

export interface Route {
    readonly pageType: route.Page;
    readonly pageId: string;
}

export const selectRoute = (store: app.Store): Route => {
    return store.applicationState.routeInStore;
};
