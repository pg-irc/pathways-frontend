// tslint:disable:no-expression-statement no-let
import { reducer, suggestAnUpdate,
    chooseChangeNameOrDetails, chooseRemoveService,
    chooseOtherChanges, submit, discardChanges, close,
    back, finishFeedback, buildDefaultStore, cancelDiscardChanges } from '../feedback';
import { aString, aBoolean } from '../../helpers/random_test_values';
import { FeedbackModal, FeedbackField, ServiceFeedback, FeedbackScreen } from '../feedback/types';
import { FeedbackStoreBuilder } from './helpers/feedback_store_builder';

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).build();
        const action = suggestAnUpdate();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        expect(newStore.modal).toEqual(FeedbackModal.ChooseFeedbackModeModal);
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

        test('opens the modal for receiving updates and navigates to service detail', () => {
            const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
            const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
            const action = submit(someServiceFeedbackData());
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
            expect(newStore.modal).toEqual(FeedbackModal.ReceiveUpdatesModal);
        });
    });

   test('discarding changes resets to the default store', () => {
        const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ConfirmDiscardChangesModal).build();
        const action = discardChanges();
        const newStore = reducer(oldStore, action);
        expect(newStore).toEqual(buildDefaultStore());
    });

    test('closing dialog from a data entry screen brings up confirmation modal', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = close();
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

    test('backing out brings up confirmation modal', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = back();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(oldScreen);
        expect(newStore.modal).toEqual(FeedbackModal.ConfirmDiscardChangesModal);
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
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ReceiveUpdatesModal).build();
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
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ReceiveUpdatesModal).build();
            const action = finishFeedback(userData);
            const newStore = reducer(oldStore, action);
            expect(newStore.userInformation.name).toEqual(userData.name);
        });
    });
});
