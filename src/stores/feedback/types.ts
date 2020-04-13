export interface FeedbackStore {
    readonly screen: FeedbackScreen;
    readonly modal: FeedbackModal;
    readonly userInformation: undefined | UserInformation;
    readonly feedback: undefined | ServiceFeedback | RemoveServiceFeedback | OtherFeedback;
}

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
    readonly type: 'service_feedback';
    readonly bc211Id: FeedbackField;
    readonly name: FeedbackField;
    readonly organization: FeedbackField;
    readonly description: FeedbackField;
    readonly address: FeedbackField;
    readonly phone: FeedbackField;
    readonly website: FeedbackField;
    readonly email: FeedbackField;
    // TODO remove all fields below and use other types in this file
    readonly removalReason: FeedbackField;
    readonly other: FeedbackField;
    readonly authorIsEmployee: FeedbackField;
    readonly authorEmail: FeedbackField;
    readonly authorName: FeedbackField;
    readonly authorOrganization: FeedbackField;
    readonly authorJobTitle: FeedbackField;
}

export interface OtherFeedback {
    readonly type: 'other_feedback';
    readonly value: string;
}

export interface RemoveServiceFeedback {
    readonly type: 'remove_service';
    readonly reason: string;
}
