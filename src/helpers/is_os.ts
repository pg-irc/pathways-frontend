import { Platform } from 'react-native';

export const isOS = (OS: string): boolean => (
    Platform.OS === OS
);