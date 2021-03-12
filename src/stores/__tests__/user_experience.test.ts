// tslint:disable:no-expression-statement typedef
import { buildDefaultStore, reducer, BookmarksTab, HeaderMenu } from '../user_experience';
import * as Actions from '../user_experience/actions';
import { aNumber, aString, aBoolean } from '../../application/helpers/random_test_values';
import { saveLocaleRequest } from '../locale/actions';

describe('the user experience reducer', () => {

    describe('the home page offset', () => {

        it('is set to the offset by the set home page offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, Actions.saveHomePageScrollOffset(offset));
            expect(newStore.homepageScrollOffset).toBe(offset);
        });
    });

    describe('the topic detail page offset', () => {

        it('is set to the offset by the action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, Actions.saveTopicDetailScrollOffset(offset));
            expect(newStore.topicDetailScrollOffset).toBe(offset);
        });
    });

    describe('the bookmarked offset state', () => {
        it('is set', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, Actions.saveBookmarkedTopicsScrollOffset(offset));
            expect(newStore.bookmarkedTopicsScrollOffset).toBe(offset);
        });
    });

    describe('the explore detail offset state', () => {
        it('is set to an offset number value by the save explore detail offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, Actions.saveExploreDetailScrollOffset(offset));
            expect(newStore.exploreDetailScrollOffset).toBe(offset);
        });
    });

    describe('the bookmarks tab state', () => {

        it('is set to topics when save bookmarks topic is set to 0', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.saveBookmarksTab(0));
            expect(newStore.bookmarksTab).toBe(BookmarksTab.Topics);
        });

        it ('is set to services when save bookmarks tab is set to 1', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.saveBookmarksTab(1));
            expect(newStore.bookmarksTab).toBe(BookmarksTab.Services);
        });
    });

    describe('the organization tab state', () => {

        it('is set to detail when save organization is set to 0', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.saveOrganizationTab(0));
            expect(newStore.organizationTab).toBe(0);
        });

        it ('is set to services when save organization tab is set to 1', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.saveOrganizationTab(1));
            expect(newStore.organizationTab).toBe(1);
        });
    });

    describe('the header menu state', () => {

        it('is set to header menu is closed by the close header menu action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.closeHeaderMenu());
            expect(newStore.headerMenu).toBe(HeaderMenu.HeaderMenuIsClosed);
        });

        it('is set to header menu is open by the open header menu action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.openHeaderMenu());
            expect(newStore.headerMenu).toBe(HeaderMenu.HeaderMenuIsOpen);
        });

        it('is set to header menu is open by the close about modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.closeAboutModal());
            expect(newStore.headerMenu).toBe(HeaderMenu.HeaderMenuIsOpen);
        });

        it('is set to about modal is open by the open about modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.openAboutModal());
            expect(newStore.headerMenu).toBe(HeaderMenu.AboutModalIsOpen);
        });

        it('is set to header menu is open by the close disclaimer modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.closeDisclaimerModal());
            expect(newStore.headerMenu).toBe(HeaderMenu.HeaderMenuIsOpen);
        });

        it ('is set disclaimer modal is open by the open disclaimer modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, Actions.openDisclaimerModal());
            expect(newStore.headerMenu).toBe(HeaderMenu.DisclaimerModalIsOpen);
        });

        it ('is set to header menu is closed by the save locale requestion action', () => {
            const oldStore = buildDefaultStore();
            const localeCode = aString();
            const flipOrientation = aBoolean();
            const newStore = reducer(oldStore, saveLocaleRequest(localeCode, flipOrientation));
            expect(newStore.headerMenu).toBe(HeaderMenu.HeaderMenuIsClosed);
        });
    });
});
