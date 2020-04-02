import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const isDeviceOnline = async (): Promise<boolean> => {
    return NetInfo.fetch().then((connectionInfo: NetInfoState) => {
        return connectionInfo.type !== 'none';
      });
};
