import React from 'react';
import { FlatList } from 'react-native';
import { Task, TaskDetail } from '../task_detail/task_detail';

interface Props {
    tasks: Task[];
}

const taskDetailActions = {
    addToTaskList: (): void => alert('Adding to list'),
    deleteFromTaskList: (): void => alert('Deleting from list'),
    markTaskAsComplete: (): void => alert('Marked as complete'),
    shareTask: (): void => alert('Sharing'),
    starTask: (): void => alert('Starring'),
};

const renderUserTask = ({item}: any): JSX.Element => {
    return (
      <TaskDetail
          task={item}
          {...taskDetailActions}
      />
    );
};

const extractKey = (item: any): string => item.id.toString();

export const TaskList: React.SFC<Props> = (props: Props): JSX.Element => (
    <FlatList
        data={props.tasks}
        renderItem={renderUserTask}
        keyExtractor={extractKey}
    />
);