// tslint:disable:no-expression-statement
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { watchLoadLocale, watchSetLocale } from './locale';
import { watchLoadFonts } from './fonts';
import { watchUpdateTaskServices } from './services';
import { watchLoadUserData, watchUserStateChangesToSaveUserData } from './user_data';
import { watchAnalytics } from './analytics/watch';

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
    middleware.run(watchSetLocale);
    middleware.run(watchUserStateChangesToSaveUserData);
    middleware.run(watchLoadUserData);
    middleware.run(watchUpdateTaskServices);
    middleware.run(watchAnalytics);
}
