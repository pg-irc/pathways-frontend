import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

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
    OpenDisclaimerModalAction;

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

export interface HeaderMenuStore {
    readonly isHeaderMenuVisible: boolean;
    readonly isAboutModalVisible: boolean;
    readonly isDisclaimerModalVisible: boolean;
}

export const buildDefaultStore = (): HeaderMenuStore => ({
    isHeaderMenuVisible: false,
    isAboutModalVisible: false,
    isDisclaimerModalVisible: false,
});

export const reducer = (store: HeaderMenuStore = buildDefaultStore(), action?: HeaderMenuAction): HeaderMenuStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.CLOSE_HEADER_MENU:
            return ({
                ...store,
                isHeaderMenuVisible: false,
            });
        case constants.OPEN_HEADER_MENU:
            return ({
                ...store,
                isHeaderMenuVisible: true,
            });
        case constants.CLOSE_ABOUT_MODAL:
            return ({
                ...store,
                isAboutModalVisible: false,
            });
        case constants.OPEN_ABOUT_MODAL:
            return ({
                ...store,
                isAboutModalVisible: true,
            });
        case constants.CLOSE_DISCLAIMER_MODAL:
            return ({
                ...store,
                isDisclaimerModalVisible: false,
            });
        case constants.OPEN_DISCLAIMER_MODAL:
            return ({
                ...store,
                isDisclaimerModalVisible: true,
            });
        default:
            return store;
    }
};