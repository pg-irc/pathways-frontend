// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { ServiceMap } from '../../../validation/services/types';
import { PersistedData } from '../../persisted_data';
import { SearchServiceData } from '../../../validation/search/types';
import { LatLong } from '../../../validation/latlong/types';
import { Announcement } from '../../../validation/announcements/types';

export class PersistedDataBuilder {
    chosenAnswers: AnswerId[] = [];
    bookmarkedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    bookmarkedServices: ServiceMap = {};
    disableAnalytics: boolean = false;
    searchTerm: string = '';
    searchLocation: string = '';
    searchLatLong: LatLong = undefined;
    searchPage: number = 0;
    numberOfSearchPages: number = 0;
    searchOffset: number = 0;
    searchResults: ReadonlyArray<SearchServiceData> = [];
    collapseSearchInput: boolean = false;
    showPartialLocalizationMessage: boolean = true;
    announcements: ReadonlyArray<Announcement> = [];

    withChosenAnswer(id: AnswerId): PersistedDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    withBookmarkedTopic(id: TopicId): PersistedDataBuilder {
        this.bookmarkedTopics.push(id);
        return this;
    }

    withShowOnboarding(showOnboarding: boolean): PersistedDataBuilder {
        this.showOnboarding = showOnboarding;
        return this;
    }

    withBookmarkedServices(services: ServiceMap): PersistedDataBuilder {
        this.bookmarkedServices = {
            ...this.bookmarkedServices,
            ...services,
        };
        return this;
    }

    withDisableAnalytics(disableAnalytics: boolean): PersistedDataBuilder {
        this.disableAnalytics = disableAnalytics;
        return this;
    }

    withSearchTerm(searchTerm: string): PersistedDataBuilder {
        this.searchTerm = searchTerm;
        return this;
    }

    withSearchLocation(searchLocation: string): PersistedDataBuilder {
        this.searchLocation = searchLocation;
        return this;
    }

    withSearchLatLong(searchLatLong: LatLong): PersistedDataBuilder {
        this.searchLatLong = searchLatLong;
        return this;
    }

    withSearchPage(searchPage: number): PersistedDataBuilder {
        this.searchPage = searchPage;
        return this;
    }

    withNumberOfSearchPages(numberOfSearchPages: number): PersistedDataBuilder {
        this.numberOfSearchPages = numberOfSearchPages;
        return this;
    }

    withSearchIndex(searchOffset: number): PersistedDataBuilder {
        this.searchOffset = searchOffset;
        return this;
    }

    withSearchResults(searchResults: ReadonlyArray<SearchServiceData>): PersistedDataBuilder {
        this.searchResults = searchResults;
        return this;
    }

    withIsInputCollapsed(collapseSearchInput: boolean): PersistedDataBuilder {
        this.collapseSearchInput = collapseSearchInput;
        return this;
    }

    withShowPartialLocalizationMessage(showPartialLocalizationMessage: boolean): PersistedDataBuilder {
        this.showPartialLocalizationMessage = showPartialLocalizationMessage;
        return this;
    }

    withAnnouncements(announcements: ReadonlyArray<Announcement>): PersistedDataBuilder {
        this.announcements = announcements;
        return this;
    }

    build(): PersistedData {
        return {
            chosenAnswers: this.chosenAnswers,
            bookmarkedTopics: this.bookmarkedTopics,
            showOnboarding: this.showOnboarding,
            bookmarkedServices: this.bookmarkedServices,
            disableAnalytics: this.disableAnalytics,
            searchTerm: this.searchTerm,
            searchLocation: this.searchLocation,
            searchLatLong: this.searchLatLong,
            searchPage: this.searchPage,
            numberOfSearchPages: this.numberOfSearchPages,
            searchOffset: this.searchOffset,
            searchResults: this.searchResults,
            collapseSearchInput: this.collapseSearchInput,
            showPartialLocalizationMessage: this.showPartialLocalizationMessage,
            announcements: this.announcements,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.build());
    }
}
