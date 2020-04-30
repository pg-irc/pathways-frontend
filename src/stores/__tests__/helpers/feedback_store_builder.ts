// tslint:disable: no-class readonly-keyword no-this no-expression-statement
import { FeedbackScreen, FeedbackModal, UserInformation, Feedback,
    FeedbackStore } from '../../feedback/types';

export class FeedbackStoreBuilder {
    screen: FeedbackScreen = FeedbackScreen.ServiceDetail;
    modal: FeedbackModal = FeedbackModal.None;
    userInformation: UserInformation =  { email: '', name: '', organizationName: '', jobTitle: '', isEmployee: false };
    feedback: Feedback | undefined = undefined;
    isSending: boolean = false;
    error: string = '';

    withScreen(screen: FeedbackScreen): FeedbackStoreBuilder {
        this.screen = screen;
        return this;
    }

    withModal(modal: FeedbackModal): FeedbackStoreBuilder {
        this.modal = modal;
        return this;
    }

    withUserData(userInfo: UserInformation): FeedbackStoreBuilder {
        this.userInformation = userInfo;
        return this;
    }

    withFeedbackData(feedback: Feedback): FeedbackStoreBuilder {
        this.feedback = feedback;
        return this;
    }

    build(): FeedbackStore {
        return {
            screen: this.screen,
            modal: this.modal,
            userInformation: this.userInformation,
            feedback: this.feedback,
            isSending: this.isSending,
            error: this.error,
        };
    }
}
