import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectLocale } from '../../selectors/locale/select_locale';
import { PushNotificationTokenRequestAction, pushNotificationTokenRequest } from '../../sagas/post_push_notification_token';
import { LocaleWithLabel } from '../../application/locales';
import { pickRegion } from '../../selectors/region/pick_region';
import { openLanguageDrawer, OpenLanguageDrawerAction } from '../../stores/user_experience/actions';

const selectOtherLocales = (store: Store): ReadonlyArray<LocaleWithLabel> => {
    const locales = selectAvailableLocales(store);
    const currentLocale = selectLocale(store);
    return locales.filter((l: LocaleWithLabel): boolean => l.code !== currentLocale);
};

const mapStateToProps = (store: Store): HeaderMenuProps => ({
    currentLocale: selectLocale(store),
    currentRegion: pickRegion(store),
    otherLocales: selectOtherLocales(store),
});

type Actions = SaveLocaleRequestAction | PushNotificationTokenRequestAction | OpenLanguageDrawerAction;
const mapDispatchToProps = (dispatch: Dispatch<Actions>): HeaderMenuActions => ({
    setLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
    updateNotificationToken: (): PushNotificationTokenRequestAction => dispatch(pushNotificationTokenRequest()),
    openLanguageDrawer: (): OpenLanguageDrawerAction => dispatch(openLanguageDrawer()),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);
