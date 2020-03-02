// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { ServiceMap } from '../../../validation/services/types';
import { PersistedData } from '../../persisted_data';

export class PersistedDataBuilder {
    chosenAnswers: AnswerId[] = [];
    bookmarkedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    bookmarkedServices: ServiceMap = {};
    disableAnalytics: boolean = false;
    searchTerm: string = '';
    searchLocation: string = '';
    isInputCollapsed: boolean = false;
    showPartialLocalizationMessage: boolean = true;

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

    withIsInputCollapsed(isInputCollapsed: boolean): PersistedDataBuilder {
        this.isInputCollapsed = isInputCollapsed;
        return this;
    }

    withShowPartialLocalizationMessage(showPartialLocalizationMessage: boolean): PersistedDataBuilder {
        this.showPartialLocalizationMessage = showPartialLocalizationMessage;
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
            isInputCollapsed: this.isInputCollapsed,
            showPartialLocalizationMessage: this.showPartialLocalizationMessage,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.build());
    }
}
