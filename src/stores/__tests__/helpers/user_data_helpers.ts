// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { PersistedUserData } from '../../user_data';
import { ServiceMap } from '../../../validation/services/types';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    bookmarkedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    bookmarkedServices: ServiceMap = {};

    addChosenAnswer(id: AnswerId): PersistedUserDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    addBookmarkedTopic(id: TopicId): PersistedUserDataBuilder {
        this.bookmarkedTopics.push(id);
        return this;
    }

    addShowOnboarding(showOnboarding: boolean): PersistedUserDataBuilder {
        this.showOnboarding = showOnboarding;
        return this;
    }

    addBookmarkedServices(services: ServiceMap): PersistedUserDataBuilder {
        this.bookmarkedServices = {
            ...this.bookmarkedServices,
            ...services,
        };
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            chosenAnswers: this.chosenAnswers,
            bookmarkedTopics: this.bookmarkedTopics,
            showOnboarding: this.showOnboarding,
            bookmarkedServices: this.bookmarkedServices,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
