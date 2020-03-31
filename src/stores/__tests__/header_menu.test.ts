// tslint:disable:no-expression-statement
import { HeaderMenuStore, reducer, closeHeaderMenu, openHeaderMenu, closeAboutModal, closeDisclaimerModal, openDisclaimerModal, openAboutModal } from '../header_menu';

describe('the header menu reducer', () => {

    describe('the header menu state', () => {

        it('is set to header menu is closed by the close header menu action', () => {
            const oldStore = HeaderMenuStore.HeaderMenuIsOpen;
            const newStore = reducer(oldStore, closeHeaderMenu());
            expect(newStore).toBe(HeaderMenuStore.HeaderMenuIsClosed);
        });

        it('is set to header menu is open by the open header menu action', () => {
            const oldStore = HeaderMenuStore.HeaderMenuIsClosed;
            const newStore = reducer(oldStore, openHeaderMenu());
            expect(newStore).toBe(HeaderMenuStore.HeaderMenuIsOpen);
        });

        it('is set to header menu is open by the close about modal action', () => {
            const oldStore = HeaderMenuStore.AboutModalIsOpen;
            const newStore = reducer(oldStore, closeAboutModal());
            expect(newStore).toBe(HeaderMenuStore.HeaderMenuIsOpen);
        });

        it('is set to about modal is open by the open about modal action', () => {
            const oldStore = HeaderMenuStore.HeaderMenuIsOpen;
            const newStore = reducer(oldStore, openAboutModal());
            expect(newStore).toBe(HeaderMenuStore.AboutModalIsOpen);
        });

        it('is set to header menu is open by the close disclaimer modal action', () => {
            const oldStore = HeaderMenuStore.DisclaimerModalIsOpen;
            const newStore = reducer(oldStore, closeDisclaimerModal());
            expect(newStore).toBe(HeaderMenuStore.HeaderMenuIsOpen);
        });

        it ('is set disclaimer modal is open by the open disclaimer modal action', () => {
            const oldStore = HeaderMenuStore.HeaderMenuIsOpen;
            const newStore = reducer(oldStore, openDisclaimerModal());
            expect(newStore).toBe(HeaderMenuStore.DisclaimerModalIsOpen);
        });
    });
});