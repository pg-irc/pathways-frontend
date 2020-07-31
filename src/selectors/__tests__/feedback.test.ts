// tslint:disable:no-expression-statement disable-next-line typedef
import { pickSendableFeedback } from '../feedback/pick_sendable_feedback';
import { buildFeedbackAuthorDataToPost } from '../feedback/build_feedback_author_data_to_post';
import { buildFeedbackContentToPost } from '../feedback/build_feedback_content_to_post';
import { FeedbackStoreBuilder } from '../../stores/__tests__/helpers/feedback_store_builder';
import { aString } from '../../application/helpers/random_test_values';
import { Feedback, UserInformation, OtherFeedback, RemoveServiceFeedback } from '../../stores/feedback/types';
import { getEmptyServiceFeedback } from '../../stores/feedback';
import { HumanServiceDataBuilder } from '../../stores/__tests__/helpers/services_helpers';
import { ServiceFeedbackBuilder } from '../../stores/__tests__/helpers/feedback_builder';

describe('picking feedback properties to send with: pickSendableFeedback()', () => {

    it('will always pick the type field', () => {
        const feedback = {
            type: 'service_feedback',
        };
        const sendableProperties = { type: 'service_feedback' };
        const store = new FeedbackStoreBuilder().withFeedbackData(feedback as Feedback).build();
        expect(pickSendableFeedback(store)).toEqual(sendableProperties);
    });

    it('will pick "other" and "remove" feedback properties that are strings', () => {
        const feedback: Feedback = {
            type: 'other_feedback',
            value: aString(),
        };
        const sendableProperties = { type: feedback.type, value: feedback.value };
        const store = new FeedbackStoreBuilder().withFeedbackData(feedback).build();
        expect(pickSendableFeedback(store)).toEqual(sendableProperties);
    });

    it('will pick "service" feedback properties that have shouldSend set to true', () => {
        const feedback = {
            ...getEmptyServiceFeedback(),
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

        expect(buildFeedbackAuthorDataToPost(userInformation)).toEqual({
            authorName: userInformation.name,
            authorEmail: userInformation.email,
            authorOrganization: userInformation.organizationName,
            authorJobTitle: userInformation.jobTitle,
            authorIsEmployee: 'true',
        });
    });

    it('sets is employee field to "false" if missing', () => {
        const userInformation = {};
        expect(buildFeedbackAuthorDataToPost(userInformation as UserInformation)).toEqual({
            authorIsEmployee: 'false',
        });
    });

    it('sets other missing author fields to undefined', () => {
        const userInformation = {};
        expect(buildFeedbackAuthorDataToPost(userInformation as UserInformation)).toEqual({
            authorIsEmployee: 'false',
            authorName: undefined,
            authorEmail: undefined,
            authorJobTitle: undefined,
            authorOrganization: undefined,
        });
    });

});

describe('converting Feedback to FeedbackPostDataContent with: toFeedbackPostDataContent()', () => {

    it('builds expected FeedbackPostDataContent object from "service" Feedback', (): void => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback = new ServiceFeedbackBuilder().build();
        expect(buildFeedbackContentToPost(feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            name: feedback.name.value,
            organization: feedback.organization.value,
            description: feedback.description.value,
            address: feedback.address.value,
            phone: feedback.phone.value,
            website: feedback.website.value,
            email: feedback.email.value,
        });
    });

    it('includes service id in post payload', (): void => {
        const serviceId = aString();
        const humanServiceData = new HumanServiceDataBuilder().withId(serviceId).build();
        const feedback = new ServiceFeedbackBuilder().build();
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211Id).toBe(serviceId);
    });

    it('includes service name in post payload for "service" feedback', (): void => {
        const serviceName = aString();
        const humanServiceData = new HumanServiceDataBuilder().withName(serviceName).build();
        const feedback = new ServiceFeedbackBuilder().build();
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211ServiceName).toBe(serviceName);
    });

    it('includes organization name in post payload for "service" feedback', () => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback = new ServiceFeedbackBuilder().build();
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211OrganizationName).toBe(humanServiceData.organizationName);
    });

    it('includes service name in post payload for "other" feedback', (): void => {
        const serviceName = aString();
        const humanServiceData = new HumanServiceDataBuilder().withName(serviceName).build();
        const feedback: OtherFeedback = { type: 'other_feedback', value: aString()};
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211ServiceName).toBe(serviceName);
    });

    it('includes organization name in post payload for "other" feedback', () => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback: OtherFeedback = { type: 'other_feedback', value: aString()};
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211OrganizationName).toBe(humanServiceData.organizationName);
    });

    it('includes service name in post payload for "remove" feedback', (): void => {
        const serviceName = aString();
        const humanServiceData = new HumanServiceDataBuilder().withName(serviceName).build();
        const feedback: RemoveServiceFeedback = { type: 'remove_service', reason: aString()};
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211ServiceName).toBe(serviceName);
    });

    it('includes organization name in post payload for "remove" feedback', () => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback: RemoveServiceFeedback = { type: 'remove_service', reason: aString()};
        expect(buildFeedbackContentToPost(feedback, humanServiceData).bc211OrganizationName).toBe(humanServiceData.organizationName);
    });

    it('builds expected FeedbackPostDataContent object from "other" Feedback', () => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback: Feedback = {
            type: 'other_feedback',
            value: aString(),
        };

        expect(buildFeedbackContentToPost(feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            other: feedback.value,
        });
    });

    it('builds expected FeedbackPostDataContent object from "remove service" Feedback', (): void => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback: Feedback = {
            type: 'remove_service',
            reason: aString(),
        };

        expect(buildFeedbackContentToPost(feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            removalReason: feedback.reason,
        });
    });

    it('sets any missing "service" Feedback fields to undefined', (): void => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback = {
            type: 'service_feedback',
        };
        expect(buildFeedbackContentToPost(feedback as Feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            name: undefined,
            organization: undefined,
            description: undefined,
            address: undefined,
            phone: undefined,
            website: undefined,
            email: undefined,
        });
    });

    it('sets any missing "other" Feedback fields to undefined', (): void => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback = {
            type: 'other_feedback',
        };
        expect(buildFeedbackContentToPost(feedback as Feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            other: undefined,
        });
    });

    it('sets any missing "remove service" Feedback fields to undefined', () => {
        const humanServiceData = new HumanServiceDataBuilder().build();
        const feedback: Feedback = {
            type: 'remove_service',
            reason: undefined,
        };
        expect(buildFeedbackContentToPost(feedback, humanServiceData)).toEqual({
            bc211Id: humanServiceData.id,
            bc211ServiceName: humanServiceData.name,
            bc211OrganizationName: humanServiceData.organizationName,
            removalReason: undefined,
        });
    });
});
