import { NetInfo } from 'react-native';

export const deviceIsOnline = async (): Promise<boolean> => {
    const connectionInfo = await NetInfo.getConnectionInfo();
    return connectionInfo.type !== 'none';
};
