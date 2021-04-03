import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { LocaleInfo } from '../../locale';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectLocale } from '../../selectors/locale/select_locale';
import { PushNotificationTokenRequestAction, pushNotificationTokenRequest } from '../../sagas/post_push_notification_token';

const selectOtherLocales = (store: Store): ReadonlyArray<LocaleInfo> => {
    const locales = selectAvailableLocales(store);
    const currentLocale = selectLocale(store);
    return locales.filter((l: LocaleInfo): boolean => l.code !== currentLocale.code);
};

const mapStateToProps = (store: Store): HeaderMenuProps => ({
    currentLocale: selectLocale(store),
    availableLocales: selectOtherLocales(store),
});

const mapDispatchToProps = (dispatch: Dispatch<SaveLocaleRequestAction | PushNotificationTokenRequestAction>): HeaderMenuActions => ({
    setLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
    updateNotificationToken: (): PushNotificationTokenRequestAction => dispatch(pushNotificationTokenRequest()),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);
