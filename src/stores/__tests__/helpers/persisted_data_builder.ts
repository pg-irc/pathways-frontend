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

    build(): PersistedData {
        return {
            chosenAnswers: this.chosenAnswers,
            bookmarkedTopics: this.bookmarkedTopics,
            showOnboarding: this.showOnboarding,
            bookmarkedServices: this.bookmarkedServices,
            disableAnalytics: this.disableAnalytics,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.build());
    }
}
