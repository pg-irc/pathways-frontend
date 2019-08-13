import { NetInfo, ConnectionInfo } from 'react-native';

export const deviceIsOffline = async (): Promise<boolean> => {
    return NetInfo.getConnectionInfo().then((connectionInfo: ConnectionInfo) => {
        return connectionInfo.type === 'none';
    });
};
