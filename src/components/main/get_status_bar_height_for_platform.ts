import { StatusBar } from 'react-native';
import { isAndroid } from '../../application/helpers/is_android';

export const getStatusBarHeightForPlatform = (): number => (
    isAndroid() ? StatusBar.currentHeight : 0
);
