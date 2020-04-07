import { StatusBar } from 'react-native';
import Constants, { AppOwnership } from 'expo-constants';
import { isAndroid } from '../../application/helpers/is_android';

export const getStatusBarHeightForPlatform = (): number => (
    isStandaloneAndroidBuild() ? StatusBar.currentHeight : 0
);

const isStandaloneAndroidBuild = (): boolean => (
    isAndroid() && Constants.appOwnership === AppOwnership.Standalone
);