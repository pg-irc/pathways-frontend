import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { LocaleInfo } from '../../locale';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectLocale } from '../../selectors/locale/select_locale';
import { PushNotificationTokenRequestAction, pushNotificationTokenRequest } from '../../sagas/post_push_notification_token';
import { selectIsRTL } from '../../selectors/locale/select_is_RTL';

const mapStateToProps = (store: Store): HeaderMenuProps => {
    const isRTL = selectIsRTL(store);
    const locales = selectAvailableLocales(store);
    const locale = selectLocale(store);
    const currentLocale = locales.find((aLocale: LocaleInfo): boolean => locale.code === aLocale.code);
    const availableLocales = locales.filter((aLocale: LocaleInfo): boolean => locale.code !== aLocale.code);
    return { currentLocale, availableLocales, isRTL };
};

const mapDispatchToProps = (dispatch: Dispatch<SaveLocaleRequestAction | PushNotificationTokenRequestAction>): HeaderMenuActions => ({
    setLocale: (localeCode: string, flipOrientation: boolean, isRTL: boolean): SaveLocaleRequestAction =>
        dispatch(saveLocaleRequest(localeCode, flipOrientation, isRTL)),
    updateNotificationToken: (): PushNotificationTokenRequestAction => dispatch(pushNotificationTokenRequest()),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);