import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import { Location } from 'history';
import {  LocaleCode } from '../application/locales';

export type RouteChangedAction = Readonly<ReturnType<typeof routeChanged>>;

// tslint:disable-next-line:typedef
export const routeChanged = (location: Location, locale: LocaleCode) => (
    helpers.makeAction(constants.ROUTE_CHANGED, { location, locale })
);
