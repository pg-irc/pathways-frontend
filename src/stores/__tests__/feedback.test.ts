// tslint:disable:no-expression-statement no-let
import { reduce, FeedbackScreen, suggestAnUpdate, chooseChangeNameOrDetails, chooseRemoveService, chooseOtherChanges, submit, discardChanges, close, back, finishFeedback } from '../feedback/actions';

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = {
            screen: FeedbackScreen.ServiceDetail,
        };
        const action = suggestAnUpdate();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ChooseFeedbackModeModal);
    });
    test('change name and details opens editable service detail', () => {
        const oldStore = {
            screen: FeedbackScreen.ChooseFeedbackModeModal,
        };
        const action = chooseChangeNameOrDetails();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.EditableServiceDetailPage);
    });

    test('remove service opens remove service page', () => {
        const oldStore = {
            screen: FeedbackScreen.ChooseFeedbackModeModal,
        };
        const action = chooseRemoveService();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.RemoveServicePage);
    });

    test('other service feedback opens other service feedback page', () => {
        const oldStore = {
            screen: FeedbackScreen.ChooseFeedbackModeModal,
        };
        const action = chooseOtherChanges();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.OtherChangesPage);
    });

    test('hitting the submit button opens the modal for receiving updates', () => {
        const oldStore = {
            screen: FeedbackScreen.EditableServiceDetailPage,
        };
        const action = submit();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ReceiveUpdatesModal);
    });

   test('discarding changes navigates back to service detail', () => {
        const oldStore = {
            screen: FeedbackScreen.ConfirmDiscardChangesModal,
        };
        const action = discardChanges();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
    });

    test('closing dialog brings up confirmation modal', () => {
        const oldStore = {
            screen: FeedbackScreen.OtherChangesPage,
        };
        const action = close();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ConfirmDiscardChangesModal);
    });

    test('backing out brings up confirmation modal', () => {
        const oldStore = {
            screen: FeedbackScreen.OtherChangesPage,
        };
        const action = back();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ConfirmDiscardChangesModal);
    });

    describe('finish feedback flow', () => {
        test('returns to service detail page', () => {
            const oldStore = {
                screen: FeedbackScreen.ReceiveUpdatesModal,
            };
            const action = finishFeedback(undefined);
            const newStore = reduce(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        });

        test('saves user information in store if given', () => {

        });

        test('user information can be omitted', () => {

        });
    });
});
