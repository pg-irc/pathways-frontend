import { Platform, StatusBar } from 'react-native';
import Constants, { AppOwnership } from 'expo-constants';

export const getStatusBarHeightForPlatform = (): number => {
    if (Platform.OS === 'ios') {
        return 0;
    }
    return isStandaloneAndroidBuild() ? StatusBar.currentHeight : 0;
};

const isStandaloneAndroidBuild = (): boolean => (
    Constants.appOwnership === AppOwnership.Standalone
);