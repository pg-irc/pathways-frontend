// tslint:disable:no-expression-statement
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { watchLoadLocale, watchSaveLocale, watchLocaleSuccess } from './locale';
import { watchLoadFonts } from './fonts';
import { watchUpdateServicesForTopic } from './services';
import { watchLoadUserData, watchUserStateChangesToSaveUserData } from './user_data';
import { watchAnalytics } from './analytics/watch_analytics';
import { watchRequestPostPushNotificationToken } from './post_push_notification_token';
import { watchSetLatLongForServices } from './set_lat_long_for_services';
import { watchSearchRequest } from './search/search_request';
import { watchLoadMoreRequest } from './search/load_more_request';

export const sagaMiddleware = createSagaMiddleware();

export interface ApplicationSaga {
    readonly middleware: SagaMiddleware<object>;
}

export function buildSaga(): ApplicationSaga {
    return {
        middleware: createSagaMiddleware<object>(),
    };
}

export function runSaga(middleware: SagaMiddleware<object>): void {
    middleware.run(watchLoadFonts);
    middleware.run(watchLoadLocale);
    middleware.run(watchLocaleSuccess);
    middleware.run(watchSaveLocale);
    middleware.run(watchUserStateChangesToSaveUserData);
    middleware.run(watchLoadUserData);
    middleware.run(watchUpdateServicesForTopic);
    middleware.run(watchAnalytics);
    middleware.run(watchRequestPostPushNotificationToken);
    middleware.run(watchSetLatLongForServices);
    middleware.run(watchSearchRequest);
    middleware.run(watchLoadMoreRequest);
}
