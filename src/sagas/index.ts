// tslint:disable:no-expression-statement
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { watchLoadLocale, watchSaveLocale, watchLocaleSuccess } from './locale';
import { watchLoadFonts } from './fonts';
import { watchUpdateServicesForTopic } from './services';
import { watchLoadUserData, watchUserStateChangesToSaveUserData } from './user_data';
import { watchAnalytics } from './analytics/watch_analytics';
import { watchRequestPushNotificationToken } from './post_push_notification_token';
import { watchRequestGetAlters } from './get_alert';
import { watchSendFeedback } from './feedback';

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
    middleware.run(watchRequestPushNotificationToken);
    middleware.run(watchRequestGetAlters);
    middleware.run(watchSendFeedback);
}
