export type Id = string;

export enum NotificationType {
    Expiring,
}

export interface Notification {
    readonly id: Id;
    readonly type: NotificationType;
    readonly text: string;
}

export interface NotificationMap {
    readonly [property: string]: Notification;
}

export interface Store {
    readonly notifications: NotificationMap;
}
