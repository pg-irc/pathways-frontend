import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const deviceIsOnline = async (): Promise<boolean> => {
    return NetInfo.fetch().then((connectionInfo: NetInfoState) => {
        return connectionInfo.type !== 'none';
      });
};
