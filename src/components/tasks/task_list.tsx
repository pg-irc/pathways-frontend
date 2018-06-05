import React from 'react';
import { FlatList } from 'react-native';
import { Task } from './task';
import { TaskActions } from './actions';
import * as selector from '../../selectors/tasks';

interface TaskRenderer {
    (item: selector.LocalizedTask, actions: TaskActions): JSX.Element;
}

export interface Props {
    readonly tasks: ReadonlyArray<selector.LocalizedTask>;
    readonly taskRenderer: TaskRenderer;
}

export interface Actions {
}

const extractKey = (item: selector.LocalizedTask): string => item.id.toString();

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const renderItem = ({ item }: { readonly item: selector.LocalizedTask }): JSX.Element => (
       props.taskRenderer(item, props)
    );
    return (
        <FlatList
            data={props.tasks}
            renderItem={renderItem}
            keyExtractor={extractKey}
        />
    );
};

export const renderSavedTask = (item: selector.LocalizedTask, actions: TaskActions): JSX.Element => {
    return (
        <Task
            id={item.id}
            taskUserSettingsId={item.taskUserSettingsId}
            title={item.title}
            description={item.description}
            category={item.category}
            importance={item.importance}
            starred={item.starred}
            completed={item.completed}
            tags={item.tags}
            removeFromSavedList={actions.removeFromSavedList}
            toggleCompleted={actions.toggleCompleted}
            toggleStarred={actions.toggleStarred}
            shareTask={actions.shareTask}
        />
    );
};

export const renderSuggestedTask = (item: selector.LocalizedTask, actions: TaskActions): JSX.Element => {
    return (
        <Task
            id={item.id}
            taskUserSettingsId={item.taskUserSettingsId}
            title={item.title}
            description={item.description}
            category={item.category}
            importance={item.importance}
            starred={item.starred}
            completed={item.completed}
            tags={item.tags}
            addToSavedList={actions.addToSavedList}
            shareTask={actions.shareTask}
        />
    );
};