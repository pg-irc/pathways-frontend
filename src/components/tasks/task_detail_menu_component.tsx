import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Icon, Text, Button } from 'native-base';
import { applicationStyles, textStyles, colors } from '../../application/styles';
import { TaskStateButton } from './task_states';
import { FloatingActionButtonsComponent } from '../floating_action_buttons/floating_action_buttons_component';

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

const getTaskDetailMenuButtons = (props: Props): ReadonlyArray<JSX.Element> => {
    return R.map((button: TaskStateButton) => {
        switch (button) {
            default:
            case TaskStateButton.AddToPlanButton:
                return buildTaskDetailMenuButton(
                    'plus',
                    <Trans>Add to plan</Trans>,
                    props.addButtonOnPress,
                );
            case TaskStateButton.RemoveFromPlanButton:
                return buildTaskDetailMenuButton(
                    'minus',
                    <Trans>Remove from plan</Trans>,
                    props.removeButtonOnPress,
                );
            case TaskStateButton.DoneButton:
                return buildTaskDetailMenuButton(
                    'square-o',
                    <Trans>Mark done</Trans>,
                    props.doneButtonOnPress,
                );
            case TaskStateButton.NotDoneButton:
                return buildTaskDetailMenuButton(
                    'check-square-o',
                    <Trans>Mark not done</Trans>,
                    props.notDoneButtonOnPress,
                );
        }
    }, props.buttons);
};

const buildTaskDetailMenuButton = (icon: string, content: JSX.Element, onPress: () => void): JSX.Element => (
    <Button
        onPress={onPress}
        style={[applicationStyles.whiteButton, applicationStyles.boxShadowBelow]}
    >
        <Icon name={icon} type={'FontAwesome'} style={{ color: colors.topaz }}/>
        <Text style={textStyles.paragraphStyle}>
            {content}
        </Text>
    </Button>
);
