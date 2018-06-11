// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { Content, Button, Text, Container, ListItem, Icon, Grid, Col, Row } from 'native-base';
import { ConnectedSavedTasks } from '../tasks/connected_saved_tasks';
import { ConnectedSuggestedTasks } from '../tasks/connected_suggested_tasks';
import { Trans } from '@lingui/react';
import { applicationStyles } from '../../application/styles';
import { myPlanStyles } from './styles';
import Collapsible from 'react-native-collapsible';

interface Props {
}

interface State {
    savedTasksCollapsed: boolean;
    suggestedTasksCollapsed: boolean;
}

export class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            savedTasksCollapsed: false,
            suggestedTasksCollapsed: true,
        };
    }

    render(): JSX.Element {
        return (
            <Container>
                <Content padder>
                    <Text style={applicationStyles.pageTitle}><Trans>My Plan</Trans></Text>
                    <ListItem
                        noBorder button
                        onPress={(): void => this.toggleSavedTasksCollapsed()}>
                        <Text style={applicationStyles.bold}><Trans>TASKS I PLAN TO DO</Trans></Text>
                        <Icon
                            style={myPlanStyles.icon}
                            name={this.getIconNameForCollapsible(this.state.savedTasksCollapsed)}
                        />
                    </ListItem>
                    <Collapsible collapsed={this.state.savedTasksCollapsed}>
                        <ConnectedSavedTasks />
                    </Collapsible>
                    <ListItem
                        style={myPlanStyles.suggestedTasksListItem} noBorder button noIndent
                        onPress={(): void => this.toggleSuggestedTasksCollapsed()}>
                        <Grid>
                            <Row>
                                <Col size={85} >
                                    <Row style={myPlanStyles.listItemLabel}>
                                        <Text style={applicationStyles.bold}><Trans>RECOMMENDED FOR ME</Trans></Text>
                                        <Icon
                                            style={myPlanStyles.icon}
                                            name='star-circle'
                                            type='MaterialCommunityIcons'/>
                                        <Icon
                                            style={myPlanStyles.icon}
                                            name={this.getIconNameForCollapsible(this.state.suggestedTasksCollapsed)}
                                        />
                                    </Row>
                                </Col>
                                <Col size={15}>
                                    <Button dark transparent>
                                        <Icon name='more' />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={85}>
                                    <Row>
                                        <Text>Important for all newcomers to BC</Text>
                                    </Row>
                                </Col>
                                <Col size={15}>
                                    <Button dark transparent>
                                        <Icon style={myPlanStyles.infoIcon} name='information-outline' type='MaterialCommunityIcons'/>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <Collapsible collapsed={this.state.suggestedTasksCollapsed}>
                        <ConnectedSuggestedTasks />
                    </Collapsible>
                </Content>
            </Container>
        );
    }

    toggleSavedTasksCollapsed(): void {
        this.setState({ savedTasksCollapsed: !this.state.savedTasksCollapsed});
    }

    toggleSuggestedTasksCollapsed(): void {
        this.setState({ suggestedTasksCollapsed: !this.state.suggestedTasksCollapsed});
    }

    getIconNameForCollapsible(collapsed: boolean): string {
        return collapsed ? 'arrow-forward' : 'arrow-down';
    }
}
