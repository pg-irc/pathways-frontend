import React from 'react';
import { Content, Text, Container, Tabs, Tab, H3, TabHeading } from 'native-base';
import { ConnectedSavedTasks } from '../tasks/connected_saved_tasks';
import { ConnectedSuggestedTasks } from '../tasks/connected_suggested_tasks';
import { Trans } from '@lingui/react';

export const Component: React.StatelessComponent = (): JSX.Element =>  {
    return (
        <Container>
            <Content padder>
                <Trans><Text>My Plan</Text></Trans>
                <Trans><Text>Tasks I plan to do</Text></Trans>
                    <ConnectedSavedTasks />
                <Trans><Text>Recommended for me</Text></Trans>
                    <ConnectedSuggestedTasks />
            </Content>
        </Container>
    );
};
