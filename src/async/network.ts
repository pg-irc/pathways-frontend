import { NetInfo, ConnectionInfo } from 'react-native';

export const deviceIsOnline = async (): Promise<boolean> => {
    return NetInfo.getConnectionInfo().then((connectionInfo: ConnectionInfo) => {
        return connectionInfo.type !== 'none';
    });
};
