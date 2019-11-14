import { Application } from './lib/application';
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN, SENTRY_ENABLE_IN_DEV, SENTRY_DEBUG } from 'react-native-dotenv';

Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: SENTRY_ENABLE_IN_DEV,
    debug: SENTRY_DEBUG
});

export default Application;
