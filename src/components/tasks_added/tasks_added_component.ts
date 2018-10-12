import { emptyComponent } from '../empty_component/empty_component';

export interface TasksAddedProps {
    readonly showQuestionnairePopup: boolean;
}

export interface TasksAddedActions {
}

type Props = TasksAddedProps & TasksAddedActions;

export const TasksAddedComponent: React.StatelessComponent<Props> = (_: Props): JSX.Element => {
    // get the list of newly recommended tasks
    return emptyComponent();
};
