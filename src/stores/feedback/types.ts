export enum FeedbackScreen {
    ServiceDetail,
    ChooseFeedbackModeModal,
    EditableServiceDetailPage,
    RemoveServicePage,
    OtherChangesPage,
    ReceiveUpdatesModal,
    ConfirmDiscardChangesModal,
}

export interface UserInformation {
    readonly email: string;
    readonly name: string;
    readonly organizationName: string;
    readonly jobTitle: string;
}
