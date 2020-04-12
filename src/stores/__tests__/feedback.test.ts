// tslint:disable:no-expression-statement no-let
import { reducer, FeedbackScreen, suggestAnUpdate,
    chooseChangeNameOrDetails, chooseRemoveService,
    chooseOtherChanges, submit, discardChanges, close,
    back, finishFeedback, FeedbackStore } from '../feedback';
import { aString, aBoolean } from '../../helpers/random_test_values';
import { FeedbackModal, UserInformation } from '../feedback/types';

// tslint:disable: no-class readonly-keyword no-this
class FeedbackStoreBuilder {
    screen: FeedbackScreen = FeedbackScreen.ServiceDetail;
    modal: FeedbackModal = FeedbackModal.None;
    userInformation: UserInformation =  { email: '', name: '', organizationName: '', jobTitle: '' };

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

    build(): FeedbackStore {
        return {
            screen: this.screen,
            modal: this.modal,
            userInformation: this.userInformation,
        };
    }
}

describe('feedback reducer', () => {
    test('suggest update opens choose mode modal', () => {
        const oldStore = new FeedbackStoreBuilder().withScreen(FeedbackScreen.ServiceDetail).build();
        const action = suggestAnUpdate();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
        expect(newStore.modal).toEqual(FeedbackModal.ChooseFeedbackModeModal);
    });

    describe('with chose feedback mode modal', () => {
        test('change name and details opens editable service detail', () => {
                const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseChangeNameOrDetails();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.EditableServiceDetailPage);
        });

        test('remove service opens remove service page', () => {
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseRemoveService();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.RemoveServicePage);
        });

        test('other service feedback opens other service feedback page', () => {
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ChooseFeedbackModeModal).build();
            const action = chooseOtherChanges();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(FeedbackScreen.OtherChangesPage);
        });
    });

    describe('submit button', ()=>{
        test('stores feedback data', ()=>{

        });
        test('opens the modal for receiving updates', () => {
            const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
            const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
            const action = submit();
            const newStore = reducer(oldStore, action);
            expect(newStore.screen).toEqual(oldScreen);
            expect(newStore.modal).toEqual(FeedbackModal.ReceiveUpdatesModal);
        });
    });

   test('discarding changes navigates back to service detail', () => {
        const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ConfirmDiscardChangesModal).build();
        const action = discardChanges();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(FeedbackScreen.ServiceDetail);
    });

    test('closing dialog brings up confirmation modal', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = close();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(oldScreen);
        expect(newStore.modal).toEqual(FeedbackModal.ConfirmDiscardChangesModal);
    });

    test('backing out brings up confirmation modal', () => {
        const oldScreen = aBoolean() ? FeedbackScreen.EditableServiceDetailPage : FeedbackScreen.OtherChangesPage;
        const oldStore = new FeedbackStoreBuilder().withScreen(oldScreen).build();
        const action = back();
        const newStore = reducer(oldStore, action);
        expect(newStore.screen).toEqual(oldScreen);
        expect(newStore.modal).toEqual(FeedbackModal.ConfirmDiscardChangesModal);
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
            };
            const oldStore = new FeedbackStoreBuilder().withModal(FeedbackModal.ReceiveUpdatesModal).build();
            const action = finishFeedback(userData);
            const newStore = reducer(oldStore, action);
            expect(newStore.userInformation.name).toEqual(userData.name);
        });
    });
});
