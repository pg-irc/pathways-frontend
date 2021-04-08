import { Store } from '../../stores';

export const selectIsLocaleSet = (appStore: Store): boolean => {
    const locale = appStore.locale;
    const localeIsBlank = !locale;
    return !localeIsBlank;
}
