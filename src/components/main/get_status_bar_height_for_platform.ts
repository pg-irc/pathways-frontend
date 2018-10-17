import { Platform, StatusBar } from 'react-native';

export const getStatusBarHeightForPlatform = (): number => (
    Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
);
