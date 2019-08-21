export enum OnlineStatus {
    Loading,
    Online,
    Offline,
}

export const toStatus = (online: boolean): OnlineStatus => (online ? OnlineStatus.Online : OnlineStatus.Offline);
