export type Id = string;

export enum NotificationType {
    TaskAddedToPlan,
    TaskRemovedFromPlan,
    QuestionnaireInformation,
}

export interface Notification {
    readonly id: Id;
    readonly type: NotificationType;
}

export interface NotificationMap {
    readonly [property: string]: Notification;
}

export interface NotificationStore {
    readonly notifications: NotificationMap;
}
