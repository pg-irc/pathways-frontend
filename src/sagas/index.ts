// tslint:disable:no-expression-statement
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { watchLoadLocale, watchSaveLocale, watchLocaleSuccess } from './locale';
import { watchLoadFonts } from './fonts';
import { watchUpdateServicesForOrganization, watchUpdateServicesForTopic } from './services';
import { watchLoadUserData, watchUserStateChangesToSaveUserData } from './user_data';
import { watchAnalytics } from './analytics/watch_analytics';
import { watchRequestPushNotificationToken } from './post_push_notification_token';
import { watchRequestGetAlerts } from './alerts';
import { watchSendFeedback } from './feedback';
import { watchUOpenOrganization } from './organization';
import { watchSubmitServiceReview } from './reviews';

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
    middleware.run(watchUOpenOrganization);
    middleware.run(watchUserStateChangesToSaveUserData);
    middleware.run(watchLoadUserData);
    middleware.run(watchUpdateServicesForTopic);
    middleware.run(watchUpdateServicesForOrganization);
    middleware.run(watchAnalytics);
    middleware.run(watchRequestPushNotificationToken);
    middleware.run(watchRequestGetAlerts);
    middleware.run(watchSendFeedback);
    middleware.run(watchSubmitServiceReview);
}
