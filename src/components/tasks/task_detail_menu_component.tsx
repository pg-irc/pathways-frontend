import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { TaskStateButton } from './task_states';
import { FloatingActionButtonsComponent, FloatingActionButton } from '../floating_action_buttons/floating_action_buttons_component';

export interface TaskDetailMenuProps {
    readonly buttons: ReadonlyArray<TaskStateButton>;
}

export interface TaskDetailMenuActions {
    readonly addButtonOnPress: () => void;
    readonly removeButtonOnPress: () => void;
    readonly doneButtonOnPress: () => void;
    readonly notDoneButtonOnPress: () => void;
}

type Props = TaskDetailMenuProps & TaskDetailMenuActions;

export const TaskDetailMenuComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <FloatingActionButtonsComponent openIcon={'close'} closedIcon={'th-list'} buttons={getTaskDetailMenuButtons(props)} />
);

const getTaskDetailMenuButtons = (props: Props): ReadonlyArray<FloatingActionButton> => {
    return R.map((button: TaskStateButton) => {
        switch (button) {
            case TaskStateButton.AddToPlanButton:
                return buildFloatingActionButton(
                    'plus',
                    <Trans>Add to plan</Trans>,
                    props.addButtonOnPress,
                );
            case TaskStateButton.RemoveFromPlanButton:
                return buildFloatingActionButton(
                    'minus',
                    <Trans>Remove from plan</Trans>,
                    props.removeButtonOnPress,
                );
            case TaskStateButton.DoneButton:
                return buildFloatingActionButton(
                    'square-o',
                    <Trans>Mark done</Trans>,
                    props.doneButtonOnPress,
                );
            case TaskStateButton.NotDoneButton:
                return buildFloatingActionButton(
                    'check-square-o',
                    <Trans>Mark not done</Trans>,
                    props.notDoneButtonOnPress,
                );
            default:
                throw new Error('Invalid TaskStateButton');
        }
    }, props.buttons);
};

const buildFloatingActionButton = (icon: string, content: JSX.Element, onPress: () => void): FloatingActionButton => (
    { icon, content, onPress }
);
