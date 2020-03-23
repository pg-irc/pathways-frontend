// tslint:disable:no-expression-statement
import { HeaderMenuStore, reducer, closeHeaderMenu, openHeaderMenu, closeAboutModal, closeDisclaimerModal, openDisclaimerModal, openAboutModal } from '../header_menu';
import { aBoolean } from '../../helpers/random_test_values';

describe('header menu reducer', () => {

    describe('the header menu flag', () => {

        it('is set to false by the close header menu action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: true,
                isAboutModalVisible: aBoolean(),
                isDisclaimerModalVisible: aBoolean(),
            };
            const newStore = reducer(oldStore, closeHeaderMenu());
            expect(newStore.isHeaderMenuVisible).toBe(false);
        });

        it('is set to true by the open header menu action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: false,
                isAboutModalVisible: aBoolean(),
                isDisclaimerModalVisible: aBoolean(),
            };
            const newStore = reducer(oldStore, openHeaderMenu());
            expect(newStore.isHeaderMenuVisible).toBe(true);
        });
    });

    describe('the about modal flag', () => {

        it('is set to false by the close about modal action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: aBoolean(),
                isAboutModalVisible: true,
                isDisclaimerModalVisible: aBoolean(),
            };
            const newStore = reducer(oldStore, closeAboutModal());
            expect(newStore.isAboutModalVisible).toBe(false);
        });

        it('is set to true by the open about modal action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: aBoolean(),
                isAboutModalVisible: false,
                isDisclaimerModalVisible: aBoolean(),
            };
            const newStore = reducer(oldStore, openAboutModal());
            expect(newStore.isAboutModalVisible).toBe(true);
        });
    });

    describe('the disclaimer modal flag', () => {

        it('is set to false by the close disclaimer modal action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: aBoolean(),
                isAboutModalVisible: aBoolean(),
                isDisclaimerModalVisible: true,
            };
            const newStore = reducer(oldStore, closeDisclaimerModal());
            expect(newStore.isDisclaimerModalVisible).toBe(false);
        });

        it('is set to true by the open disclaimer modal action', () => {
            const oldStore: HeaderMenuStore = {
                isHeaderMenuVisible: aBoolean(),
                isAboutModalVisible: aBoolean(),
                isDisclaimerModalVisible: false,
            };
            const newStore = reducer(oldStore, openDisclaimerModal());
            expect(newStore.isDisclaimerModalVisible).toBe(true);
        });
    });
});