// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { Id as ServiceId, ServiceMap } from '../../../validation/services/types';
import { PersistedData } from '../../persisted_data';
import { SearchServiceData } from '../../../validation/search/types';
import { LatLong } from '../../../validation/latlong/types';
import { Alert } from '../../../validation/content/types';
import { RegionCode } from '../../../validation/region/types';

export class PersistedDataBuilder {
    region: RegionCode = undefined;
    chosenAnswers: AnswerId[] = [];
    bookmarkedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    bookmarkedServices: ServiceMap = {};
    disableAnalytics: boolean = false;
    customLatLong: LatLong = undefined;
    showLinkAlerts: boolean = true;
    searchTerm: string = '';
    searchLocation: string = '';
    searchLatLong: LatLong = undefined;
    searchPage: number = 0;
    numberOfSearchPages: number = 0;
    searchResults: ReadonlyArray<SearchServiceData> = [];
    collapseSearchInput: boolean = false;
    showPartialLocalizationMessage: boolean = true;
    alerts: ReadonlyArray<Alert> = [];
    reviewedServices: ServiceId[] = [];

    withRegion(region: RegionCode): PersistedDataBuilder {
        this.region = region;
        return this;
    }

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

    withCustomLatLong(customLatLong: LatLong): PersistedDataBuilder {
        this.customLatLong = customLatLong;
        return this;
    }

    withShowLinkAlerts(showLinkAlerts: boolean): PersistedDataBuilder {
        this.showLinkAlerts = showLinkAlerts;
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

    withReviewedServices(id: ServiceId): PersistedDataBuilder {
        this.reviewedServices.push(id);
        return this;
    }

    build(): PersistedData {
        return {
            region: this.region,
            chosenAnswers: this.chosenAnswers,
            bookmarkedTopics: this.bookmarkedTopics,
            showOnboarding: this.showOnboarding,
            bookmarkedServices: this.bookmarkedServices,
            disableAnalytics: this.disableAnalytics,
            customLatLong: this.customLatLong,
            showLinkAlerts: this.showLinkAlerts,
            searchTerm: this.searchTerm,
            searchLocation: this.searchLocation,
            searchLatLong: this.searchLatLong,
            searchPage: this.searchPage,
            numberOfSearchPages: this.numberOfSearchPages,
            searchResults: this.searchResults,
            collapseSearchInput: this.collapseSearchInput,
            showPartialLocalizationMessage: this.showPartialLocalizationMessage,
            reviewedServices: this.reviewedServices,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.build());
    }
}
