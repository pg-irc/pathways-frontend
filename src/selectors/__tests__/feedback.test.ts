// tslint:disable:no-expression-statement
import { pickSendableFeedback } from '../feedback/pick_sendable_feedback';
import { toFeedbackPostDataAuthor } from '../feedback/to_feedback_post_data_author';
import { toFeedbackPostDataContent } from '../feedback/to_feedback_post_data_content';
import { FeedbackStoreBuilder } from '../../stores/__tests__/helpers/feedback_store_builder';
import { aString } from '../../helpers/random_test_values';
import { Feedback, UserInformation } from '../../stores/feedback/types';
import { getEmptyServiceFeedback } from '../../stores/feedback';

describe('picking feedback properties to send with: pickSendableFeedback()', () => {

    it('will pick properties that are strings', () => {
        const feedback: Feedback = {
            type: 'other_feedback',
            value: aString(),
        };
        const sendableProperties = { type: feedback.type, value: feedback.value };
        const store = new FeedbackStoreBuilder().withFeedbackData(feedback).build();
        expect(pickSendableFeedback(store)).toEqual(sendableProperties);
    });

    it('will pick properties that are sendable feedback fields', () => {
        const feedback = {
            ...getEmptyServiceFeedback({ shouldSend: false }),
            organization: {
                shouldSend: true, value: aString(),
            },
        };
        const sendableProperties = { type: feedback.type, organization: feedback.organization };
        const store = new FeedbackStoreBuilder().withFeedbackData(feedback).build();
        expect(pickSendableFeedback(store)).toEqual(sendableProperties);
    });

});

describe('converting UserInformation to FeedbackPostDataAuthor with: toFeedbackPostDataAuthor()', () => {

    it('builds FeedbackPostDataAuthor object from UserInformation', () => {
        const userInformation = {
            email: aString(),
            name: aString(),
            organizationName: aString(),
            jobTitle: aString(),
            isEmployee: true,
        };

        expect(toFeedbackPostDataAuthor(userInformation)).toEqual({
            authorName: userInformation.name,
            authorEmail: userInformation.email,
            authorOrganization: userInformation.organizationName,
            authorJobTitle: userInformation.jobTitle,
            authorIsEmployee: 'true',
        });
    });

    it('sets any missing author fields to undefined', () => {
        const userInformation = {};
        expect(toFeedbackPostDataAuthor(userInformation as UserInformation)).toEqual({
            authorName: undefined,
            authorIsEmployee: undefined,
            authorEmail: undefined,
            authorJobTitle: undefined,
            authorOrganization: undefined,
        });
    });

});

describe('converting Feedback to FeedbackPostDataContent with: toFeedbackPostDataContent()', () => {

    it('builds expected FeedbackPostDataContent object from "service" Feedback', () => {
        const serviceId = aString();
        const feedbackField = {
            shouldSend: true,
            value: aString(),
        };
        const feedback: Feedback = {
            type: 'service_feedback',
            name: feedbackField,
            organization: feedbackField,
            description: feedbackField,
            address: feedbackField,
            phone: feedbackField,
            website: feedbackField,
            email: feedbackField,
        };

        expect(toFeedbackPostDataContent(feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            name: feedback.name.value,
            organization: feedback.organization.value,
            description: feedback.description.value,
            address: feedback.address.value,
            phone: feedback.phone.value,
            website: feedback.website.value,
            email: feedback.email.value,
        });
    });

    it('builds expected FeedbackPostDataContent object from "other" Feedback', () => {
        const serviceId = aString();
        const feedback: Feedback = {
            type: 'other_feedback',
            value: aString(),
        };

        expect(toFeedbackPostDataContent(feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            other: feedback.value,
        });
    });

    it('builds expected FeedbackPostDataContent object from "remove service" Feedback', () => {
        const serviceId = aString();
        const feedback: Feedback = {
            type: 'remove_service',
            reason: aString(),
        };

        expect(toFeedbackPostDataContent(feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            removalReason: feedback.reason,
        });
    });

    it('sets any missing "service" Feedback fields to undefined', () => {
        const serviceId = aString();
        const feedback = {
            type: 'service_feedback',
        };
        expect(toFeedbackPostDataContent(feedback as Feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            name: undefined,
            organization: undefined,
            description: undefined,
            address: undefined,
            phone: undefined,
            website: undefined,
            email: undefined,
        });
    });

    it('sets any missing "other" Feedback fields to undefined', () => {
        const serviceId = aString();
        const feedback = {
            type: 'other_feedback',
        };
        expect(toFeedbackPostDataContent(feedback as Feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            other: undefined,
        });
    });

    it('sets any missing "remove service" Feedback fields to undefined', () => {
        const serviceId = aString();
        const feedback = {
            type: 'remove_service',
        };
        expect(toFeedbackPostDataContent(feedback as Feedback, serviceId)).toEqual({
            bc211Id: serviceId,
            removalReason: undefined,
        });
    });
});
