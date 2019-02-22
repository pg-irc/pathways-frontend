import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import { Location } from 'history';
import { Locale } from '../locale';

export type RouteChangedAction = Readonly<ReturnType<typeof routeChanged>>;

// tslint:disable-next-line:typedef
export const routeChanged = (location: Location, locale: Locale) => (
    helpers.makeAction(constants.ROUTE_CHANGED, { location, locale })
);
