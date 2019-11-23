// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { PersistedUserData } from '../../user_data';
import { ServiceMap } from '../../../validation/services/types';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    savedTopics: TopicId[] = [];
    completedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    savedServices: ServiceMap = {};

    addChosenAnswer(id: AnswerId): PersistedUserDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    addSavedTopic(id: TopicId): PersistedUserDataBuilder {
        this.savedTopics.push(id);
        return this;
    }

    addCompletedTopic(id: TopicId): PersistedUserDataBuilder {
        this.completedTopics.push(id);
        return this;
    }

    addShowOnboarding(showOnboarding: boolean): PersistedUserDataBuilder {
        this.showOnboarding = showOnboarding;
        return this;
    }

    addSavedService(service: ServiceMap): PersistedUserDataBuilder {
        this.savedServices = {
            ...this.savedServices,
            ...service,
        };
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            chosenAnswers: this.chosenAnswers,
            savedTopics: this.savedTopics,
            completedTopics: this.completedTopics,
            showOnboarding: this.showOnboarding,
            savedServices: this.savedServices,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
