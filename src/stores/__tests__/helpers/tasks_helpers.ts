// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class

import * as store from '../../tasks';
import { aString, aBoolean, aNumber } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedText } from '../../../locale';
import { LocalizedTextBuilder } from './locale_helpers';

export class TaskBuilder {
    localeCode: string = aString();
    id: store.Id = aString();
    title: string = aString();
    description: string = aString();
    tags: ReadonlyArray<string> = [aString(), aString()];
    category: string = aString();
    importance: number = aNumber();

    withLocaleCode(localeCode: string): TaskBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): TaskBuilder {
        this.id = id;
        return this;
    }

    withTitle(title: string): TaskBuilder {
        this.title = title;
        return this;
    }

    withDescription(description: string): TaskBuilder {
        this.description = description;
        return this;
    }

    withTags(tags: ReadonlyArray<string>): TaskBuilder {
        this.tags = tags;
        return this;
    }

    withCategory(category: string): TaskBuilder {
        this.category = category;
        return this;
    }

    withImportance(importance: number): TaskBuilder {
        this.importance = importance;
        return this;
    }

    build(): store.Task {
        return {
            id: this.id,
            title: this.createLocalizedText(this.title),
            description: this.createLocalizedText(this.description),
            tags: this.tags,
            category: this.category,
            importance: this.importance,
        };
    }

    private createLocalizedText(text: string): LocalizedText {
        return new LocalizedTextBuilder(this.localeCode, text).build();
    }
}

export class TaskUserSettingsBuilder {
    id: store.Id = aString();
    taskId: store.Id = undefined;
    starred: boolean = aBoolean();
    completed: boolean = aBoolean();

    constructor(taskId: store.Id) {
        this.taskId = taskId;
        return this;
    }

    withId(id: string): TaskUserSettingsBuilder {
        this.id = id;
        return this;
    }

    withStarred(starred: boolean): TaskUserSettingsBuilder {
        this.starred = starred;
        return this;
    }

    withCompleted(completed: boolean): TaskUserSettingsBuilder {
        this.completed = completed;
        return this;
    }

    build(): store.TaskUserSettings {
        return {
            id: this.id,
            taskId: this.taskId,
            starred: this.starred,
            completed: this.completed,
        };
    }
}

export const buildNormalizedStore = (taskBuilders: ReadonlyArray<TaskBuilder>,
                                     taskUserSettingsBuilders: ReadonlyArray<TaskUserSettingsBuilder>,
                                     savedTasks: ReadonlyArray<store.Id>,
                                     suggestedTasks: ReadonlyArray<store.Id>): store.Store => (
    {
        taskMap: buildTaskMap(taskBuilders),
        taskUserSettingsMap: buildTaskUserSettingsMap(taskUserSettingsBuilders),
        savedTasksList: savedTasks,
        suggestedTasksList: suggestedTasks,
    }
);

const buildTaskMap = (tasks: ReadonlyArray<TaskBuilder>): store.TaskMap => {
    const buildAndMapToIds = (map: store.TaskMap, builder: TaskBuilder): store.TaskMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return tasks.reduce(buildAndMapToIds, {});
};

const buildTaskUserSettingsMap = (taskUserSettings: ReadonlyArray<TaskUserSettingsBuilder>): store.TaskUserSettingsMap => {
    const buildAndMapToIds = (map: store.TaskUserSettingsMap,
                              builder: TaskUserSettingsBuilder): store.TaskUserSettingsMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return taskUserSettings.reduce(buildAndMapToIds, {});
};
