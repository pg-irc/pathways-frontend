// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import { Button, Content, Text, Icon, Container, Tab, Tabs, TabHeading } from 'native-base';
import * as selector from '../../selectors/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { taskDetailStyles } from './styles';
import { Trans } from '@lingui/react';
import { TaskServices } from '../../selectors/services';
import { UpdateTaskServicesAsync, Service } from '../../stores/services';

export interface Props {
    readonly taskServices: TaskServices;
    readonly task: selector.Task;
}

export interface Actions {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}

type TabChangeEvent = { readonly i: number, from: number, readonly ref: React.Ref<Tabs> };

export class TaskDetail extends React.Component<Props & Actions> {

    constructor(props: Props & Actions) {
        super(props);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    render(): JSX.Element {
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Text style={applicationStyles.bold}><Trans>COMPLETED TASK</Trans></Text>
                        </Row>
                        <Row>
                            <Text style={taskDetailStyles.title}>{this.props.task.title}</Text>
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
                    <Tabs style={taskDetailStyles.tabs} onChangeTab={this.props.requestUpdateTaskServices}>
                        <Tab heading={<TabHeading><Text><Trans>INFORMATION</Trans></Text></TabHeading>}>
                            <Grid style={taskDetailStyles.tabContent}>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='star-circle' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
                                        <Text>This task is <Text style={applicationStyles.bold}>recommended for you</Text>.</Text>
                                    </Col>
                                </Row>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='sign-text' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
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
                            {this.props.taskServices.loading ? <Text>...{ this.props.taskServices.services.length ? 'Updating' : 'Loading' }...</Text> : undefined}
                            {this.props.taskServices.services.map((service: Service) => (
                                <Text key={service.id}>{service.name}</Text>
                            ))}
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        );
    }

    private onChangeTab({ i, from }: TabChangeEvent): void {
        if (from === 0 && i === 1) {
            this.props.requestUpdateTaskServices();
        }
    }

}
