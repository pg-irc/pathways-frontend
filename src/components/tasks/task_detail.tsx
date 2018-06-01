import React from 'react';
import { Content, Text, Container } from 'native-base';
import * as selector from '../../selectors/tasks';

export interface Props {
    readonly task: selector.Task;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <Content>
            <Text>Task Details</Text>
            <Text>{props.task.title}</Text>
        </Content>
    </Container>
);
