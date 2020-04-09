// tslint:disable:no-expression-statement no-let
import { reduce, FeedbackScreen, suggestAnUpdate,
    chooseChangeNameOrDetails, chooseRemoveService,
    chooseOtherChanges, submit, discardChanges, close,
    back, finishFeedback, FeedbackStore } from '../feedback/actions';
import { aString } from '../../helpers/random_test_values';

const makeStoreWithScreen = (screen: FeedbackScreen): FeedbackStore => ({
    screen,
    userInformation: { email: '', name: '', organizationName: '', jobTitle: ''},
});

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.ServiceDetail);
        const action = suggestAnUpdate();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ChooseFeedbackModeModal);
    });
    test('change name and details opens editable service detail', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.ChooseFeedbackModeModal);
        const action = chooseChangeNameOrDetails();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.EditableServiceDetailPage);
    });

    test('remove service opens remove service page', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.ChooseFeedbackModeModal);
        const action = chooseRemoveService();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.RemoveServicePage);
    });

    test('other service feedback opens other service feedback page', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.ChooseFeedbackModeModal);
        const action = chooseOtherChanges();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.OtherChangesPage);
    });

    describe('submit button', () => {
        test('hitting the submit button opens the modal for receiving updates', () => {
            const oldStore = makeStoreWithScreen(FeedbackScreen.EditableServiceDetailPage);
            const action = submit();
            const newStore = reduce(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ReceiveUpdatesModal);
        });
    });

   test('discarding changes navigates back to service detail', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.ConfirmDiscardChangesModal);
        const action = discardChanges();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
    });

    test('closing dialog brings up confirmation modal', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.OtherChangesPage);
        const action = close();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ConfirmDiscardChangesModal);
    });

    test('backing out brings up confirmation modal', () => {
        const oldStore = makeStoreWithScreen(FeedbackScreen.OtherChangesPage);
        const action = back();
        const newStore = reduce(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ConfirmDiscardChangesModal);
    });

    describe('finish feedback flow', () => {
        test('returns to service detail page', () => {
            const oldStore = makeStoreWithScreen(FeedbackScreen.ReceiveUpdatesModal);
            const action = finishFeedback(undefined);
            const newStore = reduce(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        });

        test('saves user information in store if given', () => {
            const userData = {
                email: aString(),
                name: aString(),
                organizationName: aString(),
                jobTitle: aString(),
            };
            const oldStore = makeStoreWithScreen(FeedbackScreen.ReceiveUpdatesModal);
            const action = finishFeedback(userData);
            const newStore = reduce(oldStore, action);
            expect(newStore.userInformation.name).toEqual(userData.name);
        });

        test('user information can be omitted', () => {
            const oldStore = makeStoreWithScreen(FeedbackScreen.ReceiveUpdatesModal);
            const action = finishFeedback();
            const newStore = reduce(oldStore, action);
            expect(newStore.userInformation.name).toEqual('');
        });
    });
});
