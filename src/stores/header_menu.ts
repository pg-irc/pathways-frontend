import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { SaveLocaleRequestAction } from './locale/actions';
export type CloseHeaderMenuAction = Readonly<ReturnType<typeof closeHeaderMenu>>;
export type OpenHeaderMenuAction = Readonly<ReturnType<typeof openHeaderMenu>>;
export type CloseAboutModalAction = Readonly<ReturnType<typeof closeAboutModal>>;
export type OpenAboutModalAction = Readonly<ReturnType<typeof openAboutModal>>;
export type CloseDisclaimerModalAction = Readonly<ReturnType<typeof closeDisclaimerModal>>;
export type OpenDisclaimerModalAction = Readonly<ReturnType<typeof openDisclaimerModal>>;

export type HeaderMenuAction =
    CloseHeaderMenuAction |
    OpenHeaderMenuAction |
    CloseAboutModalAction |
    OpenAboutModalAction |
    CloseDisclaimerModalAction |
    OpenDisclaimerModalAction |
    SaveLocaleRequestAction;

// tslint:disable-next-line: typedef
export const closeHeaderMenu = () => (
    helpers.makeAction(constants.CLOSE_HEADER_MENU)
);

// tslint:disable-next-line: typedef
export const openHeaderMenu = () => (
    helpers.makeAction(constants.OPEN_HEADER_MENU)
);

// tslint:disable-next-line: typedef
export const closeAboutModal = () => (
    helpers.makeAction(constants.CLOSE_ABOUT_MODAL)
);

// tslint:disable-next-line: typedef
export const openAboutModal = () => (
    helpers.makeAction(constants.OPEN_ABOUT_MODAL)
);

// tslint:disable-next-line: typedef
export const closeDisclaimerModal = () => (
    helpers.makeAction(constants.CLOSE_DISCLAIMER_MODAL)
);

// tslint:disable-next-line: typedef
export const openDisclaimerModal = () => (
    helpers.makeAction(constants.OPEN_DISCLAIMER_MODAL)
);

export enum HeaderMenuStore {
    HeaderMenuIsClosed,
    HeaderMenuIsOpen,
    AboutModalIsOpen,
    DisclaimerModalIsOpen,
}

export const buildDefaultStore = (): HeaderMenuStore => HeaderMenuStore.HeaderMenuIsClosed;

export const reducer = (store: HeaderMenuStore = buildDefaultStore(), action?: HeaderMenuAction): HeaderMenuStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.CLOSE_HEADER_MENU:
            return HeaderMenuStore.HeaderMenuIsClosed;
        case constants.OPEN_HEADER_MENU:
            return HeaderMenuStore.HeaderMenuIsOpen;
        case constants.CLOSE_ABOUT_MODAL:
            return HeaderMenuStore.HeaderMenuIsOpen;
        case constants.OPEN_ABOUT_MODAL:
            return HeaderMenuStore.AboutModalIsOpen;
        case constants.CLOSE_DISCLAIMER_MODAL:
            return HeaderMenuStore.HeaderMenuIsOpen;
        case constants.OPEN_DISCLAIMER_MODAL:
            return HeaderMenuStore.DisclaimerModalIsOpen;
        case constants.SAVE_LOCALE_REQUEST:
            return HeaderMenuStore.HeaderMenuIsClosed;
        default:
            return store;
    }
};