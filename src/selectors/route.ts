import * as app from '../application/store';
import * as route from '../stores/page_switcher';
import { Id } from '../stores/tasks';
import { Page } from '../stores/page_switcher';

export interface Route {
    readonly pageType: route.Page;
    readonly pageId: string;
}

export const selectRoute = (store: app.Store): Route => {
    return store.applicationState.routeInStore;
};

export const pickCurrentExploreSectionId = (store: app.Store): Id => {
    const theRoute = selectRoute(store);
    if (theRoute.pageType !== Page.ExploreSection) {
        throw new Error('The current route is not an explore section');
    }
    return theRoute.pageId;
};
