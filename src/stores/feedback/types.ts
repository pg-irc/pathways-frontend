export interface FeedbackStore {
    readonly screen: FeedbackScreen;
    readonly modal: FeedbackModal;
    readonly userInformation: undefined | UserInformation;
    readonly feedback: undefined | Feedback;
    readonly isSending: boolean;
    readonly error: string;
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
    readonly isEmployee: undefined | boolean;
}

export interface FeedbackField {
    readonly value: string;
    readonly shouldSend: boolean;
}

export interface ServiceFeedback {
    readonly type: 'service_feedback';
    readonly name: FeedbackField;
    readonly organization: FeedbackField;
    readonly description: FeedbackField;
    readonly address: FeedbackField;
    readonly phone: FeedbackField;
    readonly website: FeedbackField;
    readonly email: FeedbackField;
}

export interface OtherFeedback {
    readonly type: 'other_feedback';
    readonly value: string;
}

export interface RemoveServiceFeedback {
    readonly type: 'remove_service';
    readonly reason: string;
}

export type Feedback = ServiceFeedback | OtherFeedback | RemoveServiceFeedback;
