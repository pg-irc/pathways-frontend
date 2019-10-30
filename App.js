import { Application } from './lib/application';
import * as Sentry from 'sentry-expo';

Sentry.init({
    // DSN for PeaceGeek's pathways project
    dsn: 'https://de23d08a2e2b44a49849c045c2a6fc0c@sentry.io/256284',
    // Enable for testing purposes
    // enableInExpoDevelopment: true,
    // debug: true
});

export default Application;
