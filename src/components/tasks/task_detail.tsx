import React from 'react';
import { Button, Content, Text, Icon, Container, Tab, Tabs, TabHeading } from 'native-base';
import * as selector from '../../selectors/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { taskDetailStyles } from './styles';
import { Trans } from '@lingui/react';

export interface Props {
    readonly task: selector.Task;
}

export interface Actions {
}

export const TaskDetail: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <Content padder>
            <Grid>
                <Row>
                    <Text style={applicationStyles.bold}>COMPLETED TASK</Text>
                </Row>
                <Row>
                    <Text style={taskDetailStyles.title}>{props.task.title}</Text>
                </Row>
                <Row style={taskDetailStyles.actions}>
                    <Col size={70}>
                        <Button iconLeft rounded light>
                            <Icon name='checkbox' />
                            <Text><Trans>Done</Trans></Text>
                        </Button>
                    </Col>
                    <Col size={15}>
                        <Button dark transparent>
                            <Icon name='share' />
                        </Button>
                    </Col>
                    <Col size={15}>
                        <Button dark transparent>
                            <Icon name='more' />
                        </Button>
                    </Col>
                </Row>
            </Grid>
            <Tabs style={taskDetailStyles.tabs}>
                <Tab heading={<TabHeading><Text><Trans>INFORMATION</Trans></Text></TabHeading>}>
                    <Grid style={taskDetailStyles.tabContent}>
                        <Row style={taskDetailStyles.row}>
                            <Col size={10}>
                                <Icon type='MaterialCommunityIcons' name='star-circle' />
                            </Col>
                            <Col size={90}>
                                <Text>This task is <Text style={applicationStyles.bold}>recommended for you</Text>.</Text>
                            </Col>
                        </Row>
                        <Row style={taskDetailStyles.row}>
                            <Col size={10}>
                                <Icon type='MaterialCommunityIcons' name='sign-text' />
                            </Col>
                            <Col size={90}>
                                <Text>This task helps with <Text style={applicationStyles.bold}>settling in</Text>.</Text>
                            </Col>
                        </Row>
                        <Row style={taskDetailStyles.row}>
                            <Text>You can get information about your community ...</Text>
                        </Row>
                        <Row style={applicationStyles.hr} />
                        <Row>
                            <Text style={applicationStyles.bold}><Trans>LEARN MORE</Trans></Text>
                        </Row>
                    </Grid>
                </Tab>
                <Tab heading={<TabHeading><Text><Trans>FIND SERVICES</Trans></Text></TabHeading>}>
                </Tab>
            </Tabs>
        </Content>
    </Container>
);
