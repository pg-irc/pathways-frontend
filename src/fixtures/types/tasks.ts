import { LocalizedText } from '../../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Task {
    readonly id: Id;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly tags?: ReadonlyArray<string>;
    readonly category?: string;
    readonly importance?: number;
}

export interface TaskUserSettings {
    readonly id: Id;
    readonly taskId: Id;
    readonly starred: boolean;
    readonly completed: boolean;
}

export interface TaskMap {
    readonly [property: string]: Task;
}

export interface TaskUserSettingsMap {
    readonly [property: string]: TaskUserSettings;
}

export type TaskList = ReadonlyArray<Id>;

export interface Store {
    readonly taskMap: TaskMap;
    readonly taskUserSettingsMap: TaskUserSettingsMap;
    readonly savedTasksList: TaskList;
    readonly suggestedTasksList: TaskList;
}
