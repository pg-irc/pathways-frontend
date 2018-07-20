import React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ExploreSection } from '../../selectors/explore';
import { applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { Task } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';

export interface ExploreSectionProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<Task>;
}

export interface ExploreSectionActions {
}

type AllExploreSectionProps = ExploreSectionProps & ExploreSectionActions;

export const ExploreSectionComponent: React.StatelessComponent<AllExploreSectionProps> =
    (props: AllExploreSectionProps & RouterProps): JSX.Element => {
        return <Container>
            <Content padder>
                <Grid>
                    <Row>
                        <Col>
                            <Icon type='MaterialCommunityIcons' name={props.section.icon} />
                        </Col>
                        <Col>
                            <Text style={applicationStyles.bold}><Trans>LEARN ABOUT</Trans></Text>
                            <Text>{props.section.name}</Text>
                        </Col>
                        <Col>
                            <Button dark transparent>
                                <Icon type='MaterialCommunityIcons' name='heart-outline' />
                            </Button>
                        </Col>
                        <Col>
                            <Button dark transparent>
                                <Icon name='share' />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Text>{props.section.introduction}</Text>
                    </Row>
                    {props.tasks.map((task: Task) => (
                        <Row>
                            <Text>{task.title}</Text>
                        </Row>
                    ))}
                </Grid>
            </Content>
        </Container>;
    };
