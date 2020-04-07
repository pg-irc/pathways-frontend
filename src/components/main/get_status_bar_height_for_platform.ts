import { Platform, StatusBar } from 'react-native';
import Constants, { AppOwnership } from 'expo-constants';

export const getStatusBarHeightForPlatform = (): number => (
    isStandaloneAndroidBuild() ? StatusBar.currentHeight : 0
);

const isStandaloneAndroidBuild = (): boolean => (
    Platform.OS === 'android' && Constants.appOwnership === AppOwnership.Standalone
);