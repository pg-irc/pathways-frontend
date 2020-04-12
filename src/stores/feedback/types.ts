export enum FeedbackScreen {
    ServiceDetail,
    EditableServiceDetailPage,
    RemoveServicePage,
    OtherChangesPage,
}

export enum FeedbackModal {
    None,
    ChooseFeedbackModeModal,
    ReceiveUpdatesModal,
    ConfirmDiscardChangesModal,
}

export interface UserInformation {
    readonly email: string;
    readonly name: string;
    readonly organizationName: string;
    readonly jobTitle: string;
}
