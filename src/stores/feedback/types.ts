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

export interface FeedbackField {
    readonly value: string;
    readonly shouldSend: boolean;
}

export interface ServiceFeedback {
    readonly bc211Id: FeedbackField;
    readonly name: FeedbackField;
    readonly organization: FeedbackField;
    readonly description: FeedbackField;
    readonly address: FeedbackField;
    readonly phone: FeedbackField;
    readonly website: FeedbackField;
    readonly email: FeedbackField;
    readonly removalReason: FeedbackField;
    readonly other: FeedbackField;
    readonly authorIsEmployee: FeedbackField;
    readonly authorEmail: FeedbackField;
    readonly authorName: FeedbackField;
    readonly authorOrganization: FeedbackField;
    readonly authorJobTitle: FeedbackField;
}
