// tslint:disable:no-expression-statement no-let typedef
import { reducer, suggestAnUpdate,
    chooseChangeNameOrDetails, chooseRemoveService, chooseOtherChanges, submit, discardChanges, close,
    finishFeedback, buildDefaultStore, cancelDiscardChanges, getEmptyServiceFeedback, getEmptyUserInfo,
    closeWithFeedback, backFromContactInformation,
} from '../feedback';
import { aString, aBoolean } from '../../application/helpers/random_test_values';
import { FeedbackModal, FeedbackField, ServiceFeedback, FeedbackScreen, UserInformation, OtherFeedback, RemoveServiceFeedback } from '../feedback/types';
import { FeedbackStoreBuilder } from './helpers/feedback_store_builder';

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).build();
        const action = suggestAnUpdate();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        expect(newStore.modal).toEqual(FeedbackModal.ChooseFeedbackModeModal);
    });

    test('suggest update clears existing user feedback sate', (): void => {
        const feedbackDataAboutDescription = {
            ...getEmptyServiceFeedback(),
            description: {
                value: aString(),
                shouldSend: true,
            },
        };
        const oldStore = new FeedbackStoreBuilder().withFeedbackData(feedbackDataAboutDescription).build();
        const action = suggestAnUpdate();
        const newStore = reducer(oldStore, action);

        if (newStore.feedback.type === 'service_feedback') {
            expect(newStore.feedback.description).toEqual({value: '', shouldSend: false});
        } else {
            fail();
        }
    });

    test('suggest update clears existing user feedback sate', (): void => {
        const userData: UserInformation =  {
            email: aString(),
            name: aString(),
            organizationName: aString(),
            jobTitle: aString(),
            isEmployee: aBoolean(),
         };

        const oldStore = new FeedbackStoreBuilder().withUserData(userData).build();
        const action = suggestAnUpdate();
        const newStore = reducer(oldStore, action);

        expect(newStore.userInformation).toEqual(getEmptyUserInfo());
    });

    describe('with chose feedback mode modal', () => {
        test('change name and details opens editable service detail and closes modals', () => {
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseChangeNameOrDetails();
            const newStore = reducer(oldStore, action);
            expect(newStore.modal).toEqual(FeedbackModal.None);
            expect(newStore.screen).toEqual(FeedbackScreen.EditableServiceDetailPage);
        });

        test('remove service opens remove service page and closes modals', () => {
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseRemoveService();
            const newStore = reducer(oldStore, action);
            expect(newStore.modal).toEqual(FeedbackModal.None);
            expect(newStore.screen).toEqual(FeedbackScreen.RemoveServicePage);
        });

        test('other service feedback opens other service feedback page and closes modals', () => {
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseOtherChanges();
            const newStore = reducer(oldStore, action);
            expect(newStore.modal).toEqual(FeedbackModal.None);
            expect(newStore.screen).toEqual(FeedbackScreen.OtherChangesPage);
        });
    });

    const aFeedbackField = (): FeedbackField => ({
        value: aString(),
        shouldSend: aBoolean(),
    });

    const someServiceFeedbackData = (): ServiceFeedback => ({
        type: 'service_feedback',
        name: aFeedbackField(),
        organization: aFeedbackField(),
        description: aFeedbackField(),
        address: aFeedbackField(),
        phone: aFeedbackField(),
        website: aFeedbackField(),
        email: aFeedbackField(),
    });

    describe('submit button', () => {
        test('stores feedback data', () => {
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.EditableServiceDetailPage).build();
            const feedbackData = someServiceFeedbackData();
            const action = submit(feedbackData);
            const newStore = reducer(oldStore, action);
            if (newStore.feedback && newStore.feedback.type === 'service_feedback') {
                expect(newStore.feedback.name).toEqual(feedbackData.name);
            } else {
                fail();
            }
        });

        test('stores other feedback', () => {
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.OtherChangesPage).build();
            const aValue = aString();
            const action = submit({ type: 'other_feedback', value: aValue});
            const newStore = reducer(oldStore, action);
            if (newStore.feedback && newStore.feedback.type === 'other_feedback') {
                expect(newStore.feedback.value).toEqual(aValue);
            } else {
                fail();
            }
        });

        test('stores remove service feedback', () => {
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.RemoveServicePage).build();
            const aReason = aString();
            const action = submit({ type: 'remove_service', reason: aReason });
            const newStore = reducer(oldStore, action);
            if (newStore.feedback && newStore.feedback.type === 'remove_service') {
                expect(newStore.feedback.reason).toEqual(aReason);
            } else {
                fail();
            }
        });

        test('navigates the user to the contact information screen', () => {
            const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
            const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
            const action = submit(someServiceFeedbackData());
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ContactInformationPage);
        });
    });

   test('discarding changes resets to the default store', () => {
        const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ConfirmDiscardChangesModal).build();
        const action = discardChanges();
        const newStore = reducer(oldStore, action);
        expect(newStore).toEqual(buildDefaultStore());
    });

    test('closing dialog from an empty data entry screen brings user back to service detail', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = close();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
    });

    test('closing dialog from a populated data entry screen brings up confirmation modal', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = closeWithFeedback();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(oldScreen);
        expect(newStore.modal).toEqual(FeedbackModal.ConfirmDiscardChangesModal);
    });

    test('can close the choose feedback mode dialog', () => {
        const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
        const action = close();
        const newStore = reducer(oldStore, action);
        expect(newStore.modal).toEqual(FeedbackModal.None);
    });

    test('cancelling confirmation closes modals', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = cancelDiscardChanges();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(oldScreen);
        expect(newStore.modal).toEqual(FeedbackModal.None);
    });

    describe('finish feedback flow', () => {
        test('returns to service detail page', () => {
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ContactInformationPage).build();
            const action = finishFeedback(undefined);
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        });

        test('saves user information in store if given', () => {
            const userData = {
                email: aString(),
                name: aString(),
                organizationName: aString(),
                jobTitle: aString(),
                isEmployee: aBoolean(),
            };
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ContactInformationPage).build();
            const action = finishFeedback(userData);
            const newStore = reducer(oldStore, action);
            expect(newStore.userInformation.name).toEqual(userData.name);
        });
    });

    describe('the back button on the contact information screen', () => {

        test('brings users back to the the editable service detail screen they were previously on', () => {
            const previousScreen = FeedbackScreen.EditableServiceDetailPage;
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).withFeedbackData(someServiceFeedbackData()).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(previousScreen);
        });

        test('brings users back to the remove service screen they were previously on', () => {
            const removeServiceData: RemoveServiceFeedback = {
                type: 'remove_service',
                reason: aString(),
            };
            const previousScreen = FeedbackScreen.RemoveServicePage;
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).withFeedbackData(removeServiceData).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(previousScreen);
        });

        test('brings users back to other feedback screen they were previously on', () => {
            const otherFeedbackData: OtherFeedback = {
                type: 'other_feedback',
                value: aString(),
            };
            const previousScreen = FeedbackScreen.OtherChangesPage;
            const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).withFeedbackData(otherFeedbackData).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(previousScreen);
        });

        test('maintains users\' previous service feedback data when they are brought back to the Editable Service screen', () => {
            const serviceFeedbackData = someServiceFeedbackData();
            const oldStore = new FeedbackStoreBuilder().withFeedbackData(serviceFeedbackData).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            if (newStore.feedback.type === 'service_feedback') {
                expect(newStore.feedback.name).toEqual(serviceFeedbackData.name);
            } else {
                fail();
            }
        });

        test('maintains users\' previous other changes data when they are brought back to the Other Feedback screen', () => {
            const otherFeedbackData: OtherFeedback = {
                type: 'other_feedback',
                value: aString(),
            };
            const oldStore = new FeedbackStoreBuilder().withFeedbackData(otherFeedbackData).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            if (newStore.feedback.type === 'other_feedback') {
                expect(newStore.feedback.value).toEqual(otherFeedbackData.value);
            } else {
                fail();
            }
        });

        test('maintains users\' previous remove service data when they are brought back to the Other Feedback screen', () => {
            const removeServiceData: RemoveServiceFeedback = {
                type: 'remove_service',
                reason: aString(),
            };
            const oldStore = new FeedbackStoreBuilder().withFeedbackData(removeServiceData).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            if (newStore.feedback.type === 'remove_service') {
                expect(newStore.feedback.reason).toEqual(removeServiceData.reason);
            } else {
                fail();
            }
        });

        test('does not crash on back from contact event with undefined feedback', () => {
            const oldStore = new FeedbackStoreBuilder().withFeedbackData(undefined).build();
            const action = backFromContactInformation();
            const newStore = reducer(oldStore, action);
            expect(newStore).toEqual(oldStore);
        });
    });
});
