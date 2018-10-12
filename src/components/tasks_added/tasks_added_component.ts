import { emptyComponent } from '../empty_component/empty_component';

export interface TasksAddedProps {
}

export interface TasksAddedActions {
}

type Props = TasksAddedProps & TasksAddedActions;

export const TasksAddedComponent: React.StatelessComponent<Props> = (_: Props): JSX.Element => {
    return emptyComponent();
};
