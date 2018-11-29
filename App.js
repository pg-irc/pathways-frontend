import { Application } from './lib/application';
import Sentry from 'sentry-expo';

// DSN for PeaceGeek's pathways project.
Sentry.config('https://de23d08a2e2b44a49849c045c2a6fc0c@sentry.io/256284').install();

export default Application;
