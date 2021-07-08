import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectLocale } from '../../selectors/locale/select_locale';
import { PushNotificationTokenRequestAction, pushNotificationTokenRequest } from '../../sagas/post_push_notification_token';
import { LocaleWithLabel } from '../../application/locales';
import { pickRegion } from '../../selectors/region/pick_region';
import { closeLanguageDrawer, CloseLanguageDrawerAction } from '../../stores/user_experience/actions';
import { LanguageDrawerActions, LanguageDrawerComponent, LanguageDrawerProps } from './language_drawer_component';

const selectOtherLocales = (store: Store): ReadonlyArray<LocaleWithLabel> => {
    const locales = selectAvailableLocales(store);
    const currentLocale = selectLocale(store);
    return locales.filter((l: LocaleWithLabel): boolean => l.code !== currentLocale);
};

const mapStateToProps = (store: Store): LanguageDrawerProps => ({
    currentLocale: selectLocale(store),
    currentRegion: pickRegion(store),
    otherLocales: selectOtherLocales(store),
});

type Actions = CloseLanguageDrawerAction | SaveLocaleRequestAction | PushNotificationTokenRequestAction;
const mapDispatchToProps = (dispatch: Dispatch<Actions>): LanguageDrawerActions => ({
    saveLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
    updateNotificationToken: (): PushNotificationTokenRequestAction => dispatch(pushNotificationTokenRequest()),
    closeLanguageDrawer: (): CloseLanguageDrawerAction => dispatch(closeLanguageDrawer()),
});

export const LanguageDrawerConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(LanguageDrawerComponent);
