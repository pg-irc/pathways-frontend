// tslint:disable:no-any
import { I18nManager } from 'react-native';

// return 'right' when in RTL mode to align to the left also in RTL mode
export const alwaysLeftTextAlign = (): any => (
    { textAlign: I18nManager.isRTL ? 'right' : 'left' }
);
