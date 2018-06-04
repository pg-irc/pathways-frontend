import React from 'react';
import { Button, Content, Text, Icon, Container, Tab, Tabs, TabHeading } from 'native-base';
import * as selector from '../../selectors/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { taskDetail as styles } from './styles';

export interface Props {
    readonly task: selector.Task;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Container>
        <Content>
            <Grid style={styles.wrapper}>
                <Row>
                    <Text style={styles.bold}>COMPLETED TASK</Text>
                </Row>
                <Row>
                    <Text style={styles.title}>{props.task.title}</Text>
                </Row>
                <Row style={styles.actions}>
                    <Col size={70}>
                        <Button iconLeft rounded light>
                            <Icon name='checkbox' />
                            <Text>Done</Text> </Button>
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
            <Tabs>
                <Tab heading={<TabHeading><Text>INFORMATION</Text></TabHeading>}>
                    <Grid style={styles.wrapper}>
                        <Row style={styles.row}>
                            <Col size={10}>
                                <Icon type='MaterialCommunityIcons' name='star-circle' />
                            </Col>
                            <Col size={90}>
                                <Text>This task is <Text style={styles.bold}>recommended for you</Text>.</Text>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={10}>
                                <Icon type='MaterialCommunityIcons' name='sign-text' />
                            </Col>
                            <Col size={90}>
                                <Text>This task helps with <Text style={styles.bold}>settling in</Text>.</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Text>You can get information about your community ...</Text>
                        </Row>
                        <Row style={styles.separator} />
                        <Row>
                            <Text style={styles.bold}>LEARN MORE</Text>
                        </Row>
                    </Grid>
                </Tab>
                <Tab heading={<TabHeading><Text>FIND SERVICES</Text></TabHeading>}>
                </Tab>
            </Tabs>
        </Content>
    </Container>
);
