// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TopicId } from '../../topics';
import { PersistedUserData } from '../../user_data';
import { SelectorTopicServices } from '../../../selectors/services/types';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    savedTopics: TopicId[] = [];
    completedTopics: TopicId[] = [];
    showOnboarding: boolean = true;
    savedServices: SelectorTopicServices = {type: 'ServicesForTopic:Empty'};

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

    addSavedServices(savedServices: SelectorTopicServices): PersistedUserData {
        this.savedServices = savedServices;
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
